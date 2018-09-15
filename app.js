const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const scrape = require("./scrape")
const mongoose = require("mongoose")
//var htmlRoutes = require('./routing/htmlRoutes');
//var apiRoutes = require('./routing/apiRoutes');
global.__basedir = __dirname;

var PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
//apiRoutes.register(app);
//htmlRoutes.register(app);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/local";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

scrape()


app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});

