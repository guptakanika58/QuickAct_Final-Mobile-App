var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var jwt=require("jsonwebtoken");

/*var routes = require('./routes/index');
var users = require('./routes/users');*/

var app = express();

// view engine setup
/*app.set('views', path.join(__dirname, 'views')); */
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/www')));

/*app.use('/', routes);
app.use('/users', users);*/

// catch 404 and forward to error handler


// error handlers

app.post("/authenticate",function(req,res){
  console.log(req.body);
  if(req.body.uname == "consumer" && req.body.pwd == "123456"){
    res.json({data:true});
  }else{
    res.json({data:false});
  }
  
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
   return;
});




module.exports = app;
