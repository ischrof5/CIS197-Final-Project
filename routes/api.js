var express = require('express')
var apiRoutes = express.Router();
var User = require('../models/user.js')
var Assignments = require('../models/assignments.js')
var Space = require('../models/space.js')


apiRoutes.post('/add_assignemt', function (req, res, next) {
  var { taskTitle, taskAmount } = req.body;
  var task = new Assignments({
    heading: taskTitle,
    condition_of_assignment: false,
    id_of_responsible: "",
    space: req.session.space,
		amount: taskAmount
  })
  task.save(function (err, task) {
    if (err) next(err);
    res.redirect('/');
  })
})



apiRoutes.post('/delete_duty', function (req, res, next) {
  var { taskId } = req.body;
  var db = Assignments.findById(taskId, function (err, result) {
    if (!err) {
      result.remove()
      res.redirect('/');
    } else {
      next(err)
    }
  })
})

apiRoutes.post('/do_duty', function (req, res, next) {
  var { taskId } = req.body;
  var db = Assignments.findById(taskId, function (err, result) {
      if (!err) {
        result.id_of_responsible = req.session.userId;
        result.name_of_responsible = req.session.user;
        result.save(function (err, task) {
        console.log(err)
        if (err) next(err);
        res.redirect('/');
      })
    } else {
      next(err)
    }
  })
})

apiRoutes.post('/remove_duty', function (req, res, next) {
  var { taskId } = req.body;
  var db = Assignments.findById(taskId, function (err, result) {
    if (!err) {
      result.id_of_responsible = "";
      result.name_of_responsible = '';
      result.save(function (err, task) {
        console.log(err)
        if (err) next(err);
        res.redirect('/');
      })
    } else {
      next(err)
    }
  })
})

apiRoutes.post('/finish_duty', function (req, res, next) {
var { taskId } = req.body;
var db = Assignments.findById(taskId, function (err, result) {
    if (!err) {
      result.condition_of_assignment = true;
      result.save(function (err, task) {
        console.log(err)
        if (err) next(err);
        res.redirect('/');
      })
    } else {
      next(err)
    }
  })
})


var all_assignments = function(space_code, callback) {
  var db = Assignments.find({space: space_code}, function (err, results) {
    if(err) {
      callback(err, []);
    } else{
      callback(null, results);
    }
  })
}

var remaining_assignments_single = function(space_code, callback) {
  var db = Assignments.find({space: space_code, condition_of_assignment: false}, function (err, results) {
    if(err) {
      callback(err, []);
    } else{
      callback(null, results);
    }
  })
}

var done_assignments_single = function(space_code, callback) {
  var db = Assignments.find({space: space_code, condition_of_assignment: true}, function (err, results) {
    if(err) {
      callback(err, []);
    } else{
      callback(null, results);
    }
  })
}

module.exports = {
  apiRoutes,
  remaining_assignments_single,
  done_assignments_single,
  all_assignments
};
