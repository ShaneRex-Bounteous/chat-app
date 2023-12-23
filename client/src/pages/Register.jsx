import { useMutation } from "@apollo/client"
import { Button, Stack, TextField, Typography } from "@mui/material"
import Lottie from "lottie-react"
import { enqueueSnackbar } from "notistack"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import registerLottie from '../assets/lotties/registerLottie.json'
import Footer from "../components/Footer"
import Header from "../components/Header"
import { REGISTER_USER } from "../graphql/mutations/userMutations"
import "../styles/Register.css"
import { registerValidation } from "../utils/ValidateInputs"

const Register = () => {
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const navigate = useNavigate()
    const [register, { loading }] = useMutation(REGISTER_USER, {
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
                    enqueueSnackbar(message, {
                        variant: 'error'
                    })
                }
            } else if (err.networkError) {
                enqueueSnackbar(err.message, {
                    variant: 'error'
                })
            }
        },
        onCompleted(data) {
            setErrors({
                email: '',
                username: '',
                password: '',
                confirmPassword: ''
            })
            setFormValues({
                email: '',
                username: '',
                password: '',
                confirmPassword: ''
            })
            enqueueSnackbar('Registration Successful', {
                variant: 'success'
            })
            navigate('/login', {
                replace: '/login'
            })
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
                        <TextField type="email" variant="outlined" label="Email" required value={formValues.email} error={errors.email} helperText={errors.email} onChange={(event) => setFormValues({ ...formValues, email: event.target.value })} fullWidth />
                        <TextField type="text" variant="outlined" label="Username" required value={formValues.username} error={errors.username} helperText={errors.username} onChange={(event) => setFormValues({ ...formValues, username: event.target.value })} fullWidth />
                        <TextField type="password" variant="outlined" label="Password" required value={formValues.password} error={errors.password} helperText={errors.password} onChange={(event) => setFormValues({ ...formValues, password: event.target.value })} fullWidth />
                        <TextField type="password" variant="outlined" label="Confirm Password" required value={formValues.confirmPassword} error={errors.confirmPassword} helperText={errors.confirmPassword} onChange={(event) => setFormValues({ ...formValues, confirmPassword: event.target.value })} fullWidth />
                        <Button type="submit" variant="contained" disabled={loading} fullWidth>{loading ? 'Loading...' : 'Register'}</Button>
                    </Stack>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default Register