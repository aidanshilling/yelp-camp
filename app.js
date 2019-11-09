const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var campgrounds = [
	{
		name: 'Big Snake Lake',
		image: 'https://pixabay.com/get/57e2dd4a4351ac14f6da8c7dda793f7f1636dfe2564c704c722c78d69f4dc45b_340.jpg'
	},
	{
		name: 'Spooky Skies',
		image: 'https://pixabay.com/get/54e2dd444f55ad14f6da8c7dda793f7f1636dfe2564c704c722c78d69f4dc45b_340.jpg'
	},
	{
		name: 'Wolf Bay',
		image: 'https://pixabay.com/get/5fe8d143495ab108f5d084609620367d1c3ed9e04e50744e762c79dc974cc6_340.jpg'
	},
	{
		name: 'Clements Campsite',
		image: 'https://pixabay.com/get/57e0d6424954ac14f6da8c7dda793f7f1636dfe2564c704c722c78d69f4dc45b_340.jpg'
	}
];

app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/campgrounds', (req, res) => {
	res.render('campgrounds', { campgrounds: campgrounds });
});

app.post('/campgrounds', (req, res) => {
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = { name: name, image: image };
	campgrounds.push(newCampground);
	//redirect back to campgrounds page
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req, res) => {
	res.render('new.ejs');
});

app.listen(port, () => {
	console.log('YelpCamp server has started on port ' + port + '...');
});
