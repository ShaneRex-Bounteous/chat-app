import { useMutation } from "@apollo/client"
import { Button, Stack, TextField, Typography } from "@mui/material"
import Lottie from "lottie-react"
import { useState } from "react"
import registerLottie from '../assets/lotties/registerLottie.json'
import { REGISTER_USER } from "../graphql/mutations/userMutations"
import "../styles/Register.css"
import Footer from "./Footer"
import Header from "./Header"
import { registerValidation } from "../utils/ValidateInputs"

const Register = () => {
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [register, { data, loading }] = useMutation(REGISTER_USER, {
        onError(err) {
            if (err.graphQLErrors && err.graphQLErrors.length > 0) {
                console.log(err.graphQLErrors[0]);
                const field = err.graphQLErrors[0].extensions.fieldName || undefined
                const message = err.graphQLErrors[0].message
                if (field) {
                    setErrors({
                        username: field === 'username' ? message : '',
                        email: field === 'email' ? message : '',
                        password: field === 'password' ? message : '',
                        confirmPassword: field === 'confirmPassword' ? message : ''
                    })
                } else {
                    console.log(message);
                }
            }
        }
    })
    const [formValues, setFormValues] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    })
    const handleFormSubmit = async (event) => {
        event.preventDefault()

        const validationErrors = registerValidation({ username: formValues.username, email: formValues.email, password: formValues.password, confirmPassword: formValues.confirmPassword })
        if (Object.keys(validationErrors).length <= 0) {
            await register({
                variables: {
                    userInput: {
                        username: formValues.username,
                        password: formValues.password,
                        email: formValues.email
                    }
                }
            })
            if(data) {
                console.log(data);
                setFormValues({
                    email: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                })
                setErrors({
                    email: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                })
            }
        } else {
            setErrors({
                username: validationErrors.usernameErrors || '',
                email: validationErrors.emailErrors || '',
                password: validationErrors.passwordErrors || '',
                confirmPassword: validationErrors.confirmPasswordErrors || '',
            })
        }

    }
    return (
    <> 
        <Header />
        <div className="register-page">
            <div className="lottie-container">
                <Lottie animationData={registerLottie} autoplay style={{ height: "16rem" }} />
            </div>

            <form onSubmit={(event) => handleFormSubmit(event)} className="register-form" method="post">
                <Stack spacing={2} className="form-content">
                    <Typography variant="body1" textAlign={"center"}>
                        Create your account
                    </Typography>
                    <TextField type="email" variant="outlined" label="Email" required value={formValues.email} error={errors.email} helperText={errors.email && <span>{errors.email}</span>} onChange={(event) => setFormValues({ ...formValues, email: event.target.value })} />
                    <TextField type="text" variant="outlined" label="Username" required value={formValues.username} error={errors.username} helperText={errors.username && <span>{errors.username}</span>} onChange={(event) => setFormValues({ ...formValues, username: event.target.value })} />
                    <TextField type="password" variant="outlined" label="Password" required value={formValues.password} error={errors.password} helperText={errors.password && <span>{errors.password}</span>} onChange={(event) => setFormValues({ ...formValues, password: event.target.value })} />
                    <TextField type="password" variant="outlined" label="Confirm Password" required value={formValues.confirmPassword} error={errors.confirmPassword} helperText={errors.confirmPassword && <span>{errors.confirmPassword}</span>} onChange={(event) => setFormValues({ ...formValues, confirmPassword: event.target.value })} />
                    <Button type="submit" variant="contained" disabled={loading} fullWidth>{loading ? 'Loading...' : 'Register'}</Button>
                </Stack>
            </form>
        </div>
        <Footer />
    </>
    )
}

export default Register