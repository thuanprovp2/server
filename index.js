require('./config');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var passport = require('passport');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(passport.initialize());
require('./config/passport')(passport);

var server = app.listen(process.env.port | 8080, function () {
    var port = server.address().port;
    console.log("app running at port ", port);
});

var opt = {
    user: 'flowershop',
    pass: 'flowershop',
    auth: {
        authdb: 'flower'
    }
};

// mongodb.MongoClient.connect('mongodb://thuanprovp1:123456@ds059306.mlab.com:59306/shop_giay', function (err, database) {
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ds227565.mlab.com:27565/flower', opt, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log("Database connected");

    require('./product/product.init').initProductRouter(app);
    require('./category/category.init').initCategoryRouter(app);
    require('./role/role.init').initRoleRouter(app);
    require('./article/article.init').initArticleRouter(app);
    require('./user/user.init').initUserRouter(app);
    require('./login/login.init').initLoginRouter(app);
    require('./logout/logout.init').initLoginRouter(app);
});
