var express = require('express');
var router = express.Router();
var Todo = require("../models/todoModel")

// The main home page to dislay the tasks
router.get('/home', function(req, res, next) {
	Todo.find({}).sort({time: -1}).exec(function (err, todos) {
		if (todos) {
			var data = {todos:todos};
			res.json(data);
		} else {
			var data = {todos: []};
			res.json(data);
		}
	})
})

// Adding a task to the list of tasks
router.post('/add', function(req, res, next) {
	Todo.create({task: req.body.task, time: req.body.time, status: 'Active'}, function (err, todo) {
		todo.save();
		var data = todo;
		res.json({data: data});
	});
})

// Updating the status of a task
router.post('/status', function(req, res, next) {
	Todo.findByIdAndUpdate(req.body.id, {$set: {status: req.body.status}}, {new: true}, function (err, todo) {
		console.log(todo);
		res.json(todo);
	});
})

// Editing an existing task
router.post('/edit', function(req, res, next) {
	Todo.findByIdAndUpdate(req.body.id, {$set: {task: req.body.task}}, {new: true}, function (err, todo) {
		console.log(todo);
		res.json(todo);
	});
})

// Removing an existing task
router.post('/remove', function(req, res, next) {
	Todo.findOne({_id: req.body.id}).exec(function(err, todo) {
		data = todo;
		todo.remove();
		res.json({data: data});
	});
})

module.exports = router;

