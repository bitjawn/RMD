var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    req.checkBody('fname', 'First name is required').notEmpty();
    req.checkBody('lname', 'Last name is required').notEmpty();
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password length - minimum characters: 4').notEmpty().isLength({min:4});
    
    var errors = req.validationErrors();
    
    if (errors) {
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    
    User.findOne({'email':email}, function(err, user){
        if (err) {
            return done(err);
        }
        
        if (user) {
            return done(null, false, {message: 'User already exists'});
        }
        
        var newUser = new User();
        newUser.fname = req.body.fname;
        newUser.lname = req.body.lname;
        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.admin = req.body.admin;
        newUser.save(function(err, result){
            if (err) {
                return done(err);
            }            
            return done(null, newUser);
        });
    });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid email').notEmpty();
    
    var errors = req.validationErrors();
    
    if (errors) {
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    
    User.findOne({'email':email}, function(err, user){
        if (err) {
            return done(err);
        }
        
        if (!user) {
            return done(null, false, {message: 'Invalid email or password.'});
        }
        
        if (!user.validPassword(password)) {
            return done(null, false, {message: 'Invalid email or password.'});
        } 
        
        return done(null, user);
    });
}));

passport.use('local.admin.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    req.checkBody('fname', 'First name is required').notEmpty();
    req.checkBody('lname', 'Last name is required').notEmpty();
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password length - minimum characters: 4').notEmpty().isLength({min:4});
    
    var errors = req.validationErrors();
    
    if (errors) {
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    
    User.findOne({'email':email}, function(err, user){
        if (err) {
            return done(err);
        }
        
        if (!req.body.admin) {
            return done(null, false, {message: 'Invalid user.'});
        }
        
        if (user) {
            return done(null, false, {message: 'User already exists'});
        }
        
        var newUser = new User();
        newUser.fname = req.body.fname;
        newUser.lname = req.body.lname;
        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.admin = req.body.admin;
        newUser.save(function(err, result){
            if (err) {
                return done(err);
            }            
            return done(null, newUser);
        });
    });
}));

passport.use('local.admin.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid email').notEmpty();
        
    var errors = req.validationErrors();
    
    if (errors) {
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    
    User.findOne({'email':email}, function(err, user){
        if (err) {
            return done(err);
        }
        
        if (!user) {
            return done(null, false, {message: 'Invalid email or password.'});
        }
        
        if (!user.validPassword(password)) {
            return done(null, false, {message: 'Invalid email or password.'});
        }
        
        if (!req.body.admin) {
            return done(null, false, {message: 'Invalid user.'});
        }
        
        return done(null, user);
    });
}));