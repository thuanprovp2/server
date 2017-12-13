/**
 * Created by Thuan on 10/15/2016.
 */
exports.initArticleRouter = function initArticleRouter(app) {
    var passport = require('passport');
    app.get('/article/fetch', function fetchArticle(req, res) {
        var Article = require('./article.object');

        Article.find({})
            .exec(function (err, docs) {
                if (err) {
                    res.status(400).json({message: err});
                }
                else {
                    res.status(200).json({"data": docs});
                }
            });
    });

    app.post('/article/create', function createArticle(req, res) {

        var errorHandler = function (status, message) {
            res.status(status).json({
                message: message.toString()
            });
        };
        try {
            var Article = require('./article.object');

            var validateObjectExist = require('../utils/validateObjectExist');
            var validatePropertyObject = require('../utils/validatePropertyObject');


            var createArticle = function () {
                var article = new Article({
                    title: req.body.title,
                    description: req.body.description,
                    image:req.body.image
                });

                article.save(function (err, doc) {
                    if (err) {
                        errorHandler(400, err);
                    }
                    else {
                        res.status(201).json(doc);
                    }
                });
            };
            Promise.all([
                validatePropertyObject.call(null, req.body, ['title', 'description'])
            ])
                .then(createArticle)
                .catch(function (err) {
                    errorHandler(err.status, err.message);
                });

        }
        catch (ex) {
            console.log('create article: ' + ex.toString() + ' inline: ' + ex.stack);
            errorHandler(500, ex);
        }
    });

    app.post('/article/update', function updateArticle(req, res) {
        var errorHandler = function (status, message) {
            res.status(status).json({
                message: message.toString()
            });
        };

        try {
            var Article = require('./article.object');
            var validatePropertyObject = require('../utils/validatePropertyObject');

            var createArticle = function (article) {
                article.title = req.body.title;
                article.description = req.body.description;
                article.image = req.body.image;

                article.save(function (err, doc) {
                    if (err) {
                        errorHandler(400, err);
                    }
                    else {
                        res.status(201).json(doc);
                    }
                });
            };
            Article.findById(req.body._id, function (err, response) {
                Promise.all([
                    validatePropertyObject.call(null, req.body, ['title', 'description'])
                ])
                    .then(createArticle.bind(null, response))
                    .catch(function (err) {
                        errorHandler(err.status, err.message);
                    });
            });
        }
        catch (ex) {
            console.log('create article: ' + ex.toString() + ' inline: ' + ex.stack);
            errorHandler(500, ex);
        }
    });

    app.get('/article/delete', function deleteArticle(req, res) {
        var Article = require('./article.object');

        Article.remove({
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