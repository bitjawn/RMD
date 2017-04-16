require('dotenv').config();
var express = require('express');
var router = express.Router();
var NodeCouchDb = require('node-couchdb');
var cfc = require('../modules/cfc');

const couch = new NodeCouchDb({
    auth: {
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD
    }
});

// http://localhost:5984/menu/_design/full_menu/_view/all_dishes?limit=20&reduce=false

// http://localhost:5984/menu/_design/sorted_full_menu/_view/title_sorted?limit=20&reduce=false

// http://localhost:5984/menu/_design/sorted_full_menu/_view/category_sorted?limit=20&reduce=false

// http://localhost:5984/menu/_design/queryCategory/_view/all_breakfast?limit=20&reduce=false

// http://localhost:5984/menu/_design/queryCategory/_view/all_dinner?limit=20&reduce=false

// http://localhost:5984/menu/_design/queryCategory/_view/all_lunch?limit=20&reduce=false

const dbName = "menu";
const viewUrl = '_design/full_menu/_view/all_dishes';
const sortedTitleViewUrl = '_design/sorted_full_menu/_view/title_sorted';
const sortedCategoryViewUrl = '_design/sorted_full_menu/_view/category_sorted';
const queryBreakfast = '_design/queryCategory/_view/all_breakfast';
const queryLunch = '_design/queryCategory/_view/all_lunch';
const queryDinner = '_design/queryCategory/_view/all_dinner';

couch.listDatabases().then(function(dbs){
    // console.log(dbs);
});

// home view
router.get('/', function(req, res){
	res.render('user/index',{pageTitle:'Home'});
});

// about view
router.get('/about', function(req, res){
	res.render('user/about', {pageTitle:'About'});
});

// contact view
router.get('/contact', function(req, res){
	res.render('user/contact', {pageTitle:'Contact'});
});

// menu view
router.get('/menu', function(req, res){
	// res.render('menu', {title:'Menus'});
    couch.get(dbName, sortedCategoryViewUrl).then(
        function(data, headers, status) {  
            res.render('menu', {
                menu:data.data.rows,
                pageTitle:cfc('Menu')
            });            
        },
        function(err){
            res.send(err);
    });
});

// search view
router.get('/search/:category', function(req, res) {
    var category = req.params.category;

    switch (category.toLowerCase()) {
        case 'breakfast':
            couch.get(dbName, queryBreakfast).then(
                function(data, headers, status) { 
                    res.render('search', {
                        menu:data.data.rows,
                        category:cfc(category),
                        pageTitle:cfc('Menu')
                    });            
                },
                function(err){
                    res.send(err);
            });
            break;

        case 'lunch':
            couch.get(dbName, queryLunch).then(
                function(data, headers, status) {  
                    res.render('search', {
                        menu:data.data.rows,
                        category:cfc(category),
                        pageTitle:cfc('Menu')
                    });            
                },
                function(err){
                    res.send(err);
            });
            break;

        case 'dinner':
            couch.get(dbName, queryDinner).then(
                function(data, headers, status) {  
                    res.render('search', {
                        menu:data.data.rows,
                        category:cfc(category),
                        pageTitle:cfc('Menu')
                    });            
                },
                function(err){
                    res.send(err);
            });
            break;
    }
});

module.exports = router;