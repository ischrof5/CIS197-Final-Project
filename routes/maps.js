var express = require('express')
var router = express.Router();
var Location = require('../models/location.js')

router.get('/', function(req, res) {
	Location.find({}, function (err, outputs) {
		//console.log(outputs)
		res.render('maps');
	})
	
})


router.post('/', function(req, res) {
	//console.log(req.body.lat)
	//console.log(req.body.lng)
	//console.log(req.body.location)
	var un = req.body.location; //what is this in the case 
  	Location.find({location: un}, function (err, outputs) {
    console.log(outputs)
    if (outputs.length) {
			res.render('maps', {error: "There is a Location with same name"});
    } else {
			var u = new Location({ 
				coords: {lat: req.body.lat, lng : req.body.lng},
				content: req.body.location});
			u.save(function (err, output) {
				if (err) {
          	res.send('something went wrong: ' + err.message);

			} else {
				res.redirect('/maps');
			}
			})
    	}
	})
})


router.post('/getLocations', function(req, res) {
	Location.find({}, function (err, outputs) {
		//console.log(outputs)
		res.send(outputs);
	})
	
})

module.exports = router