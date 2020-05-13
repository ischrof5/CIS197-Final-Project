var express = require('express')
var router = express.Router();
var mongoose = require('mongoose')
var isAuthenticated = require('../middlewares/isAuthenticated')
var User = require('../models/user')
var Budget = require('../models/budget')
var UserTransactions = require('../models/userTransactions')

router.get('/', function (req, res) {
  if (!req.session.user) {
    res.redirect('/');
  } else if (req.session.space) {
    res.redirect('/');
  } else {
    var db = Budget.findById(req.session.userId, function (err, result) {
      if (!err && result != null) {
        //console.log(result.needs / result.income)
        res.render('userTransactions', {
          income: result.income,
          needs: (result.needs / result.income) * 100 ,
          wants: (result.wants / result.income) * 100,
          savings: (result.savings / result.income) * 100,
          user: req.session.user,
          userId: req.session.userId,
          error: ""
        });
      } else {
        res.render('userTransactions', {
          income: -1,
          needs: 50,
          wants: 30,
          savings: 20,
          user: req.session.user,
          userId: req.session.userId,
          error: ""
        });
      }
    })
  }
})

router.post('/getTransactions', function(req, res) {
  if (!req.session.user) {
    res.redirect('/');
  } else if (req.session.space) {
    res.redirect('/');
  } else {
    //console.log("Reached");
    var send = [];
    UserTransactions.find({}, callback, function(err, transactions) {
      if (err) {
        res.send("Error")
      } else {
        transactions.forEach(function(item) {
          //console.log(item);
          if (item.username == req.session.user) {
            send.push(item.message);
          }
        })
        callback();
      }
    })

    var callback = function() {
      res.send(JSON.stringify(send));
    }

  }
})

module.exports = router
