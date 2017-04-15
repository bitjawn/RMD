var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/accountmanager');

function exit() {
    mongoose.disconnect();
}