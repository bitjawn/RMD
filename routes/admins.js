var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var csrfProtection = csrf();
var cfc = require('../modules/cfc');
var NodeCouchDb = require('node-couchdb');

const couch = new NodeCouchDb({
    auth: {
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD
    }
});
const dbName = "menu";
const viewUrl = '_design/full_menu/_view/all_dishes';
const sortedTitleViewUrl = '_design/sorted_full_menu/_view/title_sorted';
const sortedCategoryViewUrl = '_design/sorted_full_menu/_view/category_sorted';
const queryBreakfast = '_design/queryCategory/_view/all_breakfast';
const queryLunch = '_design/queryCategory/_view/all_lunch';
const queryDinner = '_design/queryCategory/_view/all_dinner';

router.get('/profile', isLoggedIn, csrfProtection, function(req, res, next){       
    const greet = 'Greetings ' + cfc(req.user.fname);
    // res.render('admin/profile', {pageTitle:'Admin', greet:greet});

    couch.get(dbName, sortedCategoryViewUrl).then(
        function(data, headers, status) {  
            res.render('admin/profile', {
                menu:data.data.rows,
                pageTitle:cfc('Admin'),
                greet:greet,
                csrfToken: req.csrfToken(),
                isAdmin:true
            });            
        },
        function(err){
            res.send(err);
    });
});

// update
router.post('/update-item', isLoggedIn, csrfProtection, function(req, res){
    var title = req.body.title;
    var category = req.body.category;
    var duration = req.body.duration;
    var description = req.body.description;
    var ingredients = req.body.ingredients;
    var source = req.body.source;
    var id = req.body.id;
    var rev = req.body.rev;
    
    /*
    console.log('ID:\t%s', id);
    console.log('Rev:\t%s', rev);
    console.log('Title:\t%s', title);
    console.log('Category:\t%s', category);
    console.log('Duration:\t%s', duration);
    console.log('Description:\t%s', description);
    console.log('Ingredients:\t%s', ingredients);
    console.log('Image Path:\t%s', source);
    res.redirect('/admin/profile');//*/
    couch.update(dbName, {
        _id:id,
        _rev:rev,
        title:title,
        category:category,
        description:description,
        duration:duration,
        ingredients:ingredients,
        source:source
    }).then(({data, headers, status}) => {
        res.redirect('/admin/profile');
    }, err => {
        console.log(err);
    });    
});

// delete
router.delete('/delete/:id', isLoggedIn, function(req, res){
	var id = new String(req.params.id).split(':')[0];
    var rev = new String(req.params.id).split(':')[1];
    console.log('Deleting id: %s\trev:\t', id, rev);
    res.sendStatus(200);
    /*couch.del(dbName, id, rev).then(({data, headers, status}) => {        
        res.sendStatus(200);
    }, err => {
        console.log(err);
    }); //*/
});

// add
router.post('/add', isLoggedIn, function(req, res){
	var title = req.body.title;
    var category = req.body.category;
    var duration = req.body.duration;
    var description = req.body.description;
    var ingredients = req.body.ingredients;
    var source = req.body.source;
    couch.uniqid().then(function(ids){
        const id = ids[0];        
        couch.insert(dbName, {
        _id:id,
        title:title,
        category:category,
        description:description,
        duration:duration,
        ingredients:ingredients,
        source:source
        }).then(function(data, headers, status){
            res.redirect('/admin/profile');
        },
        function(err){
            console.log(err);
        });
    });
});

// search by category
router.get('/search/:category', isLoggedIn, csrfProtection, function(req, res) {
    var category = req.params.category;

    switch (category.toLowerCase()) {
        case 'breakfast':
            couch.get(dbName, queryBreakfast).then(
                function(data, headers, status) { 
                    res.render('admin/searched', {
                        results:data.data.rows,
                        header:cfc(category) + ' Results',
                        pageTitle:cfc('Search'),
                        csrfToken: req.csrfToken(),
                        'category':true
                    });            
                },
                function(err){
                    res.send(err);
                    res.redirect('/admin/profile');
            });
            break;

        case 'lunch':
            couch.get(dbName, queryLunch).then(
                function(data, headers, status) {  
                    res.render('admin/searched', {
                        results:data.data.rows,
                        header:cfc(category) + ' Results',
                        pageTitle:cfc('Search'),
                        csrfToken: req.csrfToken(),
                        'category':true
                    });            
                },
                function(err){
                    res.send(err);
                    res.redirect('/admin/profile');
            });
            break;

        case 'dinner':
            couch.get(dbName, queryDinner).then(
                function(data, headers, status) {  
                    res.render('admin/searched', {
                        results:data.data.rows,
                        header:cfc(category) + ' Results',
                        pageTitle:cfc('Search'),
                        csrfToken: req.csrfToken(),
                        'category':true
                    });            
                },
                function(err){
                    res.send(err);
                    res.redirect('/admin/profile');
            });
            break;
    }
});

// search default
router.post('/search', isLoggedIn, csrfProtection, function(req, res){
    const keyword = req.body.keyword;
    const results = [];
    couch.get(dbName, viewUrl).then(
    function(data, headers, status) {
       for (var d in data.data.rows) {
           var record = data.data.rows[d];
           if (record.value.title.trim().toLowerCase() === keyword.trim().toLowerCase() ||
               record.value._id.trim().toLowerCase() === keyword.trim().toLowerCase() ||
               record.value.description.trim().toLowerCase() === keyword.trim().toLowerCase()) {
                   results.push(record);
               }
       }       
       if (results.length > 0) {
        var records = '';
        switch (results.length) {
            case 1:
                records = 'Found 1 record';
                break;

            default:
                records = 'Found ' + results.length + ' records';
                break;
        }
           res.render('admin/searched',{results:results, pageTitle:'Search Results', csrfToken:req.csrfToken(), header:records, 'default':true});
       } else {
           res.redirect('/admin/profile');
       }
    },
    function(err){
        console(err);
        res.redirect('/admin/profile');
    });    
});

// search by id
router.get('/search/:id', isLoggedIn, csrfProtection, function(req, res, next){
     couch.get(dbName,req.params.id).then(({data, headers, status}) => {
        res.render('admin/searched', {results:data, pageTitle:'Search', admin:true, csrfToken:req.csrfToken(), header:'Found record ' + data.title, 'id':true});
    }, err => {
        console.log(err);
        res.redirect('/admin/profile');
    });
});

// logout
router.get('/logout', csrfProtection, function(req, res, next){
    req.logout();
    res.redirect('/admin/signin');
});

router.use('/', notLoggedIn, function(req, res, next){
    next();
});

// register
router.get('/signup', csrfProtection, function(req, res, next){		
    var messages = req.flash('error');		
    res.render('admin/signup', {title:'Registration', csrfToken: req.csrfToken(), messages:messages, hasErrors: messages.length > 0, isAdmin:true, admin:true});
});		
		
router.post('/signup', csrfProtection, passport.authenticate('local.admin.signup', {		
    successRedirect: '/admin/profile',		
    failureRedirect: '/admin/signup',		
    failureFlash: true		
}));//*/

// sign in
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