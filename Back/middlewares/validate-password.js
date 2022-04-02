const passwordValidator = require('password-validator');

const passwordFormat = new passwordValidator();

passwordFormat.is().min(6)
.is().max(30)
.has().uppercase(1)
.has().lowercase()
.has().digits(1)
.has().not().spaces()
.is().not().oneOf(['123456', '987654', 'password', 'Passw0rd']);

module.exports = (req, res, next) => {
    if(passwordFormat.validate(req.body.password)){
        next();
    } else {
        res.status(400).json({error: 'mot de passe trop simple!' });
    }
};