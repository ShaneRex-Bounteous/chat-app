import validator from "validator"

export const registerValidation = ({username, password, email, confirmPassword}) => {
    let errors = {}
    username = username.trim()
    email = email.trim()
    password = password.trim()
    confirmPassword = confirmPassword.trim()
    if(validator.isEmpty(username) || !validator.isLength(username, {
        min: 6,
        max: 20
    })) {
        errors.usernameErrors = 'Username must be between 6 to 20 characters'
    }
    if(!validator.isEmail(email)) {
        errors.emailErrors = 'Invaid Email'
    }

    if(validator.isEmpty(password) || !validator.isLength(password, {
        min: 6,
        max: 16
    })) {
        errors.passwordErrors = 'Password must be between 6 to 16 characters'
    }
    
    if(!validator.equals(confirmPassword, password)) {
        errors.confirmPasswordErrors = 'Passwords do not match'
    }

    return errors
}

export const loginValidation = ({username, password}) => {
    let errors = {}
    username = username.trim()
    password = password.trim()

    if(validator.isEmpty(username) || !validator.isLength(username, {
        min: 6,
        max: 20
    })) {
        errors.usernameErrors = 'Username must be between 6 to 20 characters'
    }

    if(errors.usernameErrors && validator.isEmail(username)) {
        errors.usernameErrors = ''
    }

    if(validator.isEmpty(password) || !validator.isLength(password, {
        min: 6,
        max: 16
    })) {
        errors.passwordErrors = 'Password must be between 6 to 16 characters'
    }

    return errors
}