const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//SCHEMA
const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
// 	{
// 		name: 'Spooky Skies',
// 		image: 'https://inteng-storage.s3.amazonaws.com/img/iea/MRw4y5ABO1/sizes/camping-tech-trends_resize_md.jpg'
// 	},
// 	(err, campground) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log('NEWLY CREATED CAMPGROUND: ');
// 			console.log(campground);
// 		}
// 	}
// );

app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/campgrounds', (req, res) => {
	// Get all campgrounds from DB
	Campground.find({}, (err, allCampgrounds) => {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds', { campgrounds: allCampgrounds });
		}
	});
});

app.post('/campgrounds', (req, res) => {
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = { name: name, image: image };
	//Create a new campground and save to DB
	Campground.create(newCampground, (err, newlyCreated) => {
		if (err) {
			console.log(err);
		} else {
			//redirect back to campgrounds page
			res.redirect('/campgrounds');
		}
	});
});

app.get('/campgrounds/new', (req, res) => {
	res.render('new.ejs');
});

app.listen(port, () => {
	console.log('YelpCamp server has started on port ' + port + '...');
});
