var express = require('express')
var router = express.Router();
var mongoose = require('mongoose')
var isAuthenticated = require('../middlewares/isAuthenticated')
var User = require('../models/user')
var Budget = require('../models/budget')

router.get('/', function (req, res) {
  if (!req.session.user) {
    res.redirect('/');
  } else if (req.session.space) {
    res.redirect('/');
  } else {
    res.render('budget', {});
  }
})

router.post('/storeBudget', function(req, res) {
  if (!req.session.user) {
    res.redirect('/');
  } else if (req.session.space) {
    res.redirect('/');
  } else {
    //console.log("HI")
    var db = Budget.findById(req.session.userId, function (err, result) {
      if (!err && result != null) {
        //console.log(JSON.stringify(result))
        result.income = req.body.income;
        result.needs = req.body.needs;
        result.wants = req.body.wants;
        result.savings = req.body.savings;
        result.save(function (err) {});
        res.send("Good")
      } else {
        //console.log(JSON.stringify(result))
        var budget = new Budget({
          _id: req.session.userId,
          username: req.session.user,
          income: req.body.income,
          needs: req.body.needs,
          wants: req.body.wants,
          savings: req.body.savings
        })
        budget.save(function (err, task) {
          if (err) {
            res.send("Good")
          } else {
            res.send("Good")
          }
        })
      }
    })
  }
})

module.exports = router
