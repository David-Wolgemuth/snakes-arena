/*
    Snakes Bot Game
    Server Configuration
*/

//------------ App + Server -------------//
var express = require("express");
var app = express();
var server = require("http").Server(app);

//------------ Body Parser -------------//
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//------------ Mongo Database -------------//
var connection = require("./config/database.js");

//------------ Session -------------//
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
app.use(session({
    key: "session",
    secret: process.env.SESSION_KEY || "SUPER SECRET SECRET",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: connection })
}));

//------------ Router -------------//
var router = express.Router();
require("./config/routes.js")(router);
app.use("/", router);

app.use(express.static(__dirname + "/client"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use("/styles", express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use("/codemirror",express.static( __dirname + "/node_modules/" + "codemirror"));

//------------ Server Listen -------------//
var port = process.env.PORT || 3000;
var listener = server.listen(port, function () {
    console.log("Listening On Port:", listener.address().port);
});