/**
 * Created by PC on 11/25/2016.
 */
exports.initLoginRouter = function initLoginRouter(app) {
    app.post('/logout', require('./logout'));
};