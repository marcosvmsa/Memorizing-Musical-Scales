//NPM install packages...Dependencies
var express = require ('express');
var bodyParser = require('body-parser');
var path = require('path');
// var ParseServer = require('parse-server').ParseServer;

//Sets up the the express app
var app = express();

//Where all of the post information is being pushed to
//setting up the port that the server will be listening on
var PORT = process.env.PORT || 5000;

//Sets up the express app to handle parsing
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
limit: '50mb',
extended: true,
parameterLimit:50000}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

//displaying data from the home.html file
app.get('/', function(reckor,resin){
resin.sendfile(path.join(__dirname, './app/products/html/index.html'));
});

//lets the server recognize the js files
app.use('/static', express.static('./app/products'));

//starts the server with the listening queue
app.listen(PORT, function(){
console.log("Listening on port", PORT);
});
// -------------------------
//NPM install packages...Dependencies
var express = require ('express');
var bodyParser = require('body-parser');
var path = require('path');
// var ParseServer = require('parse-server').ParseServer;

//Sets up the the express app
var app = express();

//Where all of the post information is being pushed to
//setting up the port that the server will be listening on
var PORT = process.env.PORT || 5000;

//Sets up the express app to handle parsing
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
limit: '50mb',
extended: true,
parameterLimit:50000}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

//displaying data from the home.html file
app.get('/', function(reckor,resin){
resin.sendfile(path.join(__dirname, './app/products/html/index.html'));
});

//lets the server recognize the js files
app.use('/static', express.static('./app/products'));

//starts the server with the listening queue
app.listen(PORT, function(){
console.log("Listening on port", PORT);
});

// Here is my package.json:

{
"name": "myportfolio",
"version": "1.0.0",
"description": "my portfolio",
"main": "server.js",
"scripts": {
"test": "echo "Error: no test specified" && exit 1",
"start": "node server.js"
},
"repository": {
"type": "git",
"url": "git+https://github.com/jjthom87/MyPortfolio.git"
},
"author": "",
"license": "ISC",
"bugs": {
"url": "https://github.com/jjthom87/MyPortfolio/issues"
},
"homepage": "https://github.com/jjthom87/MyPortfolio#readme",
"dependencies": {
"body-parser": "^1.15.2",
"bower": "^1.7.9",
"express": "^4.14.0"
},
"engines": {
"node": "4.4.7"
}
}