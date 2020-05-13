var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var mongoose = require('mongoose');
var isAuthenticated = require('./middlewares/isAuthenticated.js');
var Space = require('./models/space.js');
var accountRouter = require('./routes/account.js');
var spaceRouter = require('./routes/space.js');
var mapsRouter = require('./routes/maps.js');
var videosRouter = require('./routes/videos.js');

var budgetRouter = require('./routes/budget.js');
var userTransactionsRouter = require('./routes/userTransactions.js');
var async = require('async');
var {
  apiRoutes,
  remaining_assignments_single,
  done_assignments_single,
  all_assignments
} = require('./routes/api.js')
var app = express();

const MONGODB_URI = 'mongodb+srv://ischrof:John5999!@350project-vgbd8.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI || 'mongodb://localhost:27017/cis350_finalproject')

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!');
});

//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cis350_finalproject')

app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

app.use('/static', express.static(path.join(__dirname, 'static')))

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use(cookieSession({
  name: 'local-session',
  keys: ['spooky'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.get('/', function (req, res) {
  if (req.session.space) {
    var space = req.session.space;
    Space.findById(space, function (err, data) {
      done_assignments_single(space, function (err, doneTasks) {
        remaining_assignments_single(space, function (err, tasks) {
          async.forEachOf(tasks, (value, key, callback) => {
            all_assignments(value.id, function (err, subTasks) {
              callback();
            })
          }, err => {
            if (!err) res.render('index', {
              user: req.session.user,
              userId: req.session.userId,
              space: data,
              tasks,
              doneTasks
            });
            else res.render('index', {
              user: req.session.user,
              userId: req.session.userId,
              space: data,
              tasks,
              doneTasks
            });
          });
        });
      });
    });

  } else if (req.session.user) {
    res.redirect('/space/join_space');
  } else {
    res.redirect('/account/login');
  }
});

app.post('/', function (req, res) {});

app.use('/account', accountRouter)
app.use('/api', apiRoutes)
app.use('/space', spaceRouter)
app.use('/maps', mapsRouter)
app.use('/budget', budgetRouter)
app.use('/userTransactions', userTransactionsRouter)
app.use('/videos', videosRouter)

app.use(function (err, req, res, next) {
  return res.send('ERROR :  ' + err.message)
})

app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port ' + (process.env.PORT || 3000))
})
