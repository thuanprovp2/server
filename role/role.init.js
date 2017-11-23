/**
 * Created by Thuan on 10/15/2016.
 */
exports.initRoleRouter = function initRoleRouter(app) {
    var passport = require('passport');

    app.get('/role/fetch', function fetchProduct(req, res) {
        var role = require('./role.object');
        role.find({}).exec(function (err, docs) {
            if (err) {
                res.status(400).json({message: err});
            }
            else {
                res.status(200).json({"data": docs});
            }
        });
    });

    app.post('/role/create', function createProduct(req, res) {
        var Role = require('./role.object');
        var validatePropertyObject = require('../utils/validatePropertyObject');

        var errorHandler = function (status, message) {
            res.status(status).json({
                message: message.toString()
            });
        };

        var createRole = function () {
            var role = new Role({
                name: req.body.name
            });
            role.save(function (err, docs) {
                if (err) {
                    res.status(400).json({message: err});
                }
                else {
                    res.status(200).json(docs);
                }
            });
        };

        validatePropertyObject(req.body, ['name'])
            .then(createRole, errorHandler.bind(null, 400));

    });

    app.post('/role/update', function updateRole(req, res) {
        var errorHandler = function (status, message) {
            res.status(status).json({
                message: message.toString()
            });
        };

        try {
            var Role = require('./role.object');
            var validatePropertyObject = require('../utils/validatePropertyObject');

            Role.findById(req.body._id, function (err, response) {
                if (response) {
                    validatePropertyObject(req.body, ['name'])
                        .then(createRole.bind(null, response), errorHandler.bind(null, 400));
                }
                else {
                    res.status(400).json({message: "Role not exist"});
                }
            });

            var createRole = function (role) {
                role.name = req.body.name;

                role.save(function (err, doc) {
                    if (err) {
                        errorHandler(400, err);
                    }
                    else {
                        res.status(201).json(doc);
                    }
                });
            }
        }
        catch (ex) {
            console.log('create role: ' + ex.toString() + ' inline: ' + ex.stack);
            errorHandler(500, ex);
        }
    });
    app.get('/role/delete', function deleteProducts(req, res) {
        var Role = require('./role.object');

        Role.remove({
                _id: req.query.id
            },
            function (err, doc) {
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