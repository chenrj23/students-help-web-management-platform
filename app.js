var express = require("express");
var path = require("path")
var mongoose = require("mongoose")
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
var morgan = require('morgan')

var bodyParser = require("body-parser")
var cookieParser = require('cookie-Parser')


var port = process.env.PORT || 3001
var app = express()
var dbUrl = "mongodb://localhost/eap"


mongoose.connect(dbUrl)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("connect db ok");
});

app.set('views', "./app/views/pages")
app.set('view engine', 'jade')

app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
  secret: "imooc",
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'
  })
}))


if('development' === app.get('env')){
  app.set('showStackError', true)
  app.use(morgan('dev'))
  app.locals.pretty = true
  mongoose.set("debug", true)
}

require('./config/routes')(app)
app.locals.moment =require("moment")
app.listen(port);

console.log("html started on port " + port);

