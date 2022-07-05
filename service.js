const data = require('./data.json');
const path = require('path');
const fs = require('fs');

// 自动生成任务编号（自增）
let maxTaskCode = () => {
    let arr = [];
    data.forEach((item) => {
        arr.push(item.id);
    });
    arr.length == 0 ? arr = [0] : arr;
    return Math.max.apply(null, arr);
}
// 把内存数据写入文件
let writeDataToFile = (res, info) => {
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(info, null, 4), (err) => {
        if (err) {
            res.json({
                status: 500
            });
        }
        res.json({
            status: 200
        });
    });
}
// 实现全选功能
exports.allChecked = (req, res) => {
    let flag = req.params.val;
    data.forEach(item => {
        item.completed = Boolean(Number(flag))
    })
    // 把内存中的数据写入文件
    writeDataToFile(res, data);
}

// 获取任务列表数据
exports.getAllTasks = (req, res) => {
    res.json(data);
}

// 添加任务保存数据
exports.addTask = (req, res) => {
    // 获取表单数据
    let info = req.body;
    let task = {};
    for (let key in info) {
        task[key] = info[key];
    }
    task.completed = false;
    task.id = maxTaskCode() + 1;
    data.push(task);
    // 把内存中的数据写入文件
    writeDataToFile(res, data);
}
// 跳转编辑任务页面
exports.toEditTask = (req, res) => {
    let id = req.params.id;
    let task = {};
    /* data.some((item) => {
        if (id == item.id) {
            task = item;
            return true;
        }
    }); */
    let index = data.findIndex((item) => {
        return item.id == id;
    });
    task.index = index;
    res.json(task);
}
// 编辑任务更新数据
exports.editTask = (req, res) => {
    let info = req.body;
    info.id = req.params.id;
    data.some((item) => {
        if (info.id == item.id) {
            for (let key in info) {
                item[key] = info[key];
            }
            return true;
        }
    });
    // 把内存中的数据写入文件
    writeDataToFile(res, data);
}
// 删除任务信息
exports.deleteTask = (req, res) => {
    let id = req.params.id;
    console.log(id, '---------------')
    data.some((item, index) => {
        if (id == item.id) {
            // 删除数组的一项数据
            data.splice(index, 1);
            return true;
        }
    });
    // 把内存中的数据写入文件
    writeDataToFile(res, data);
}
// 删除全部完成
exports.deleteAllComplete = (req, res) => {
    var info = data.filter(item => !item.completed);
    // 把内存中的数据写入文件
    writeDataToFile(res, info);
}
// 获取未完成/已完成列表数据
exports.getStateTasks = (req, res) => {
    let state = req.params.state;
    state == 0 ? state = false : state = true;
    let newData = data.filter(item => {
        return item.completed == state;
    });
    res.json(newData);
}
// 编辑每条任务状态
exports.editTaskState = (req, res) => {
    let id = req.params.id;
    data.some((item) => {
        if (item.id == id) {
            item.completed = !item.completed;
            return true;
        }
    });
    // 把内存中的数据写入文件
    writeDataToFile(res, data);
}