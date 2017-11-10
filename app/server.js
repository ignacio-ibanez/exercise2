
const express = require('express');
const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

var path = __dirname + '/public/';
var Event = require('./models/event');

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/angular', express.static(__dirname + '/node_modules/angular')); // redirect Angular
app.use('/angularRoute', express.static(__dirname + '/node_modules/angular-route')); // redirect Angular
app.use('/ui-angular', express.static(__dirname + '/node_modules/angular-ui-bootstrap/dist')); // redirect angular-bootstrap
app.use('/public', express.static(__dirname + '/public')); // redirect html and controllers



app.get('/', (req, res) => {
	res.sendFile(path + 'index.html');
});

// Receives the post order from the client and calls the function to store the event in the DB
app.post('/songs', (req, res) => {
	// Takes the json event and passes it to the function in charge of storing it
	jsonEvent = req.query;
	storage = storeEvent(jsonEvent);
});

// Stores the event in the DB
var storeEvent = function(jsonEvent){
	var newEvent = new Event(jsonEvent);
	newEvent.save(function(err){
		if (err) throw err;
	});
}

// Endpoint to render the html that shows the songs stored in the database
app.get('/songs', (req, res) => {
	res.sendFile(path + 'songs.html');
});

// Endpoint to get the results of the query defined by the user of the app through the form
app.get('/results', function(req, res){
	return res.json(getResults(req.query));
});

// Endpoint to query the information stored in the database
var getResults = function(jsonSearch){
	// The getJson function has not been developed, but it should return a json in the correct form to use as search query
	// jsonSearch = getJson(jsonSearch);
	Event.find(jsonSearch, function(err, events){
		if(err) console.log(err);
		return events;
	});
};


// Function to adapt the json received from the client side to database format
//var getJson = function(jsonSearch){
//}
	

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);