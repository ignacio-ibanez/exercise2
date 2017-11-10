
const mongoose = require('mongoose');

// The following lines are used to connect to the database. Since in this particular implementation
// the node application and the mongo db are in two different containers, it is required to wait
// for some time to be the mongo db container up. 
// Instead of waiting, the program tries to connect to the database until it is achieved.
var connectionOptions = {
	reconnectTries: Number.MAX_VALUE
}
var connected = false
while(!connected){
	connected = true
	mongoose.connect('mongodb://mongoDocker:27017/appDB', connectionOptions, function(error){
		connected = false
	});
}

// In the following lines of code, is defined the model to be used by the application to store
// the information of the songs.
// At the end, this module is export, so that the server.js can use it.
var Schema = mongoose.Schema;

var eventSchema = new Schema({
	ts: Date,
	eventType: String,
	data: {
		t: Number,
		artist: String,
		album: String,
		track: Number,
		title: String,
		uri: String,
		user: String
	}
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;