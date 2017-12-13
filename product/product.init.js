/**
 * Created by Thuan on 10/15/2016.
 */
exports.initProductRouter = function initProductRouter(app) {
    var passport = require('passport');
    app.get('/product/fetch', function fetchProduct(req, res) {
        var Product = require('./product.object');
        var Category = require('../category/category.object');

        Product.find({})
            .populate('category')               //thuoc tinh cua object
            .exec(function (err, docs) {
                if (err) {
                    res.status(400).json({message: err});
                }
                else {
                    res.status(200).json({"data": docs});
                }
            });
    });
    
    app.post('/product/create', function createProducts(req, res) {

        var errorHandler = function (status, message) {
            res.status(status).json({
                message: message.toString()
            });
        };
        try {
            var Product = require('./product.object');
            var Category = require('../category/category.object');

            var validateObjectExist = require('../utils/validateObjectExist');
            var validatePropertyObject = require('../utils/validatePropertyObject');


            var createProduct = function () {
                var product = new Product({
                    name: req.body.name,
                    description: req.body.description,
                    image:req.body.image,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    category: req.body.category
                });

                product.save(function (err, doc) {
                    if (err) {
                        errorHandler(400, err);
                    }
                    else {
                        res.status(201).json(doc);
                    }
                });
            };
            Promise.all([
                    validatePropertyObject.call(null, req.body, ['name', 'description', 'image','price','quantity','category']),
                    validateObjectExist.call(null, Category, req.body.category)
                ])
                .then(createProduct)
                .catch(function (err) {
                    errorHandler(err.status, err.message);
                });

        }
        catch (ex) {
            console.log('create product: ' + ex.toString() + ' inline: ' + ex.stack);
            errorHandler(500, ex);
        }
    });

    app.post('/product/update', function updateProduct(req, res) {
        var errorHandler = function (status, message) {
            res.status(status).json({
                message: message.toString()
            });
        };

        try {
            var Product = require('./product.object');
            var Category = require('../category/category.object');
            var validateObjectExist = require('../utils/validateObjectExist');
            var validatePropertyObject = require('../utils/validatePropertyObject');

            var createProduct = function (product) {
                product.name = req.body.name;
                product.description = req.body.description;
                product.image = req.body.image;
                product.price = req.body.price;
                product.quantity = req.body.quantity;
                product.category = req.body.category;

                product.save(function (err, doc) {
                    if (err) {
                        errorHandler(400, err);
                    }
                    else {
                        res.status(201).json(doc);
                    }
                });
            };
            Product.findById(req.body._id, function (err, response) {
                Promise.all([
                        validatePropertyObject.call(null, req.body, ['name', 'description', 'image','price','quantity','category']),
                        validateObjectExist.call(null, Category, req.body.category)
                    ])
                    .then(createProduct.bind(null, response))
                    .catch(function (err) {
                        errorHandler(err.status, err.message);
                    });
            });
        }
        catch (ex) {
            console.log('create user: ' + ex.toString() + ' inline: ' + ex.stack);
            errorHandler(500, ex);
        }
    });
    
    app.get('/product/delete', function deleteProducts(req, res) {
        var Product = require('./product.object');

        Product.remove({
                _id: req.query.id
            },
            function(err, doc) {
                if (err)
                    res.status(400).json({
                        message: err
                    });
                else
                    res.status(200).json({
                        message: "delete success"
                    })
            });
    });
};