var express = require('express'),
	path = require('path'),
	dust = require('dustjs-helpers'),
	bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
	cons = require('consolidate'),
    mongoose = require('mongoose'),
    logger = require('morgan')
    flash = require('connect-flash'),
    validator = require('express-validator');
    MongoStore = require('connect-mongo')(session);

/*
    Removed modules
    cookieParser = require('cookie-parser'),
*/
// path to the router
var users = require('./routes/users');
var admins = require('./routes/admins');
    
var app = express();

mongoose.connect('localhost:27017/_restaurant-menu');
require('./config/passport');

/// Setting view engine and views directory location
app.engine('dust', cons.dust);
app.set('view engine','dust');
app.set('views',__dirname + '/views');

/// Body parser middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(validator());
// app.use(cookieParser());
app.use(session({
    secret: 'ouqtuInvu',
    resave:false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 180 * 60 * 1000}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

/// static resources
app.use(express.static(path.join(__dirname, 'public')));

/// routes
app.use('/', users);
app.use('/admin', admins);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {error:err,message:res.locals.message});
});

// set port
app.set('port', (process.env.PORT || 2225));

app.listen(app.get('port'), function(){
	console.log('Server started on port ' + app.get('port'));
});