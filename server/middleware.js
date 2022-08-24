const {udhariSchema} = require("./joiSchema");

module.exports.errorHandler = (err, req, res, next) => {

}

module.exports.validateData = (req, res, next) => {
    const {error} = udhariSchema.validate(req.body);
    if(error){
        const message = error.details.map(e => e.message).join(',');
        res.send(message);
    }else {
        next();
    }
}