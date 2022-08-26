const {udhariSchema} = require("./joiSchema");

// module.exports.errorHandler = (err, req, res, next) => {
//     if(err.code && err.code === 11000){
//         const field = Object.keys(err.keyValue);
//         const code = 409;
//         res.status(code).send(`An account with that ${field} already exists.`);
//     }
//     const status = err.code || 500;
//     const message = err.message || "Something went Wrong!";
//     res.status(status).send(message);
// }

module.exports.validateData = (req, res, next) => {
    const {error} = udhariSchema.validate(req.body);
    if(error){
        const message = error.details.map(e => e.message).join(',');
        res.send(message);
    }else {
        next();
    }
}