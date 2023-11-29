const validator = require('validator')
//confirmPassword can be validated on client side
const validateRegisterInput = (username, email, password) => {
    username = username.trim()
    email = email.trim()
    password = password.trim()

    if(validator.isEmpty(username) && !validator.isLength(username, {
        max: 20,
        min: 6
    })) {
        return false
    }

    if(!validator.isEmail(email)) {
        return false
    }

    if(!validator.isLength(password, {
        min: 6,
        max: 16
    })) {
        return false
    }

    return true
}

module.exports = {
    validateRegisterInput
}