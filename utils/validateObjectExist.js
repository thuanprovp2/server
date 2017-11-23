/* function: validate object is exist in db
 * table: table where object storage
 * id: id of object
 * res: response of request API
 * callback: callback which run when succes
 */
var validateObjectExist = function validateObjectExist(schema, id) {
    return new Promise(function(resolve, reject) {
        try {
            schema.find({
                    _id: id
                })
                .exec(function(err, docs) {
                    if (err) {
                        reject({
                            status: 400,
                            message: err.toString()
                        });
                    }
                    else {
                        if (docs.length > 0) {
                            resolve();
                        }
                        else {
                            reject({
                                status: 400,
                                message: schema.modelName + ' not fount!'
                            });
                        }
                    }
                });
        }
        catch (ex) {
            console.log('validate object message: ' + ex.toString() + ' inline: ' + ex.stack);
            reject({
                status: 500,
                message: ex
            });
        }
    });
};

module.exports = validateObjectExist;

