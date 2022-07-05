/*
  路由模块
*/
const express = require('express');
const router = express.Router();
const service = require('./service.js');

// 查询任务列表
router.get('/list', service.getAllTasks);
// 添加任务(提交表单)
router.post('/add', service.addTask);
// 跳转到编辑任务信息页面
router.get('/list/:id', service.toEditTask);
// 编辑任务提交表单
router.put('/list/:id', service.editTask);
// 删除任务信息
router.delete('/list/:id', service.deleteTask);
// 删除全部已完成任务
router.delete('/deleteall', service.deleteAllComplete);
// 实现全选功能
router.get('/all/:val', service.allChecked);
// 获取未完成/已完成列表数据
router.get('/state/:state', service.getStateTasks);
// 编辑每条任务状态
router.put('/state/:id', service.editTaskState);


module.exports = router;