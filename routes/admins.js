var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var csrfProtection = csrf();
var cfc = require('../modules/cfc');

router.get('/profile', isLoggedIn, csrfProtection, function(req, res, next){       
    const greet = 'Greetings ' + cfc(req.user.fname);
    res.render('admin/profile', {pageTitle:'Admin', greet:greet});
});

router.get('/logout', csrfProtection, function(req, res, next){
    req.logout();
    res.redirect('/admin/signin');
});

router.use('/', notLoggedIn, function(req, res, next){
    next();
});

router.get('/signup', csrfProtection, function(req, res, next){		
    var messages = req.flash('error');		
    res.render('admin/signup', {title:'Registration', csrfToken: req.csrfToken(), messages:messages, hasErrors: messages.length > 0, isAdmin:true, admin:true});
});		
		
router.post('/signup', csrfProtection, passport.authenticate('local.admin.signup', {		
    successRedirect: '/admin/profile',		
    failureRedirect: '/admin/signup',		
    failureFlash: true		
}));//*/

router.get('/signin', csrfProtection, function(req, res, next){
    var messages = req.flash('error');
    res.render('admin/signin', {title:'Sign In', csrfToken: req.csrfToken(), messages:messages, hasErrors: messages.length > 0, isAdmin:true, admin:true});
});

router.post('/signin', csrfProtection, passport.authenticate('local.admin.signin', {
    successRedirect: '/admin/profile',
    failureRedirect: '/admin/signin',
    failureFlash: true
}));
 
module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated() && req.user.admin) {
        return next();
    }
    res.redirect('/admin/profile');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports = router;