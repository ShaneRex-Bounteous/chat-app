const validator = require('validator')
//confirmPassword can be validated on client side
const validateRegisterInput = (username, email, password) => {
    username = username.trim()
    email = email.trim()
    password = password.trim()
    if(validator.isEmpty(username) || !validator.isLength(username, {
        min: 6,
        max: 20
    })) {
        
        return {
            valid: false,
            message: 'Username must be between 6 to 20 characters',
            field: 'username'
        }
    }
    if(!validator.isEmail(email)) {
        return {
            valid: false,
            message: 'Invaid Email',
            field: 'email'
        }
    }

    if(validator.isEmpty(password) || !validator.isLength(password, {
        min: 6,
        max: 16
    })) {
        return {
            valid: false,
            message: 'Password must be between 6 to 16 characters',
            field: 'password'
        }
    }

    return {
        valid: true,
        message: 'Fields valid',
        field: undefined
    }
}

module.exports = {
    validateRegisterInput
}