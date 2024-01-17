import { useMutation } from "@apollo/client"
import { Button, Stack, TextField, Typography } from "@mui/material"
import Lottie from "lottie-react"
import { enqueueSnackbar } from "notistack"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import loginLottie from "../assets/lotties/loginLottie.json"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { LOGIN_USER } from "../graphql/mutations/userMutations"
import "../styles/Login.css"
import { loginValidation } from "../utils/ValidateInputs"

const Login = () => {
    const [formValues, setFormValues] = useState({
        username: '',
        password: ''
    })

    const [errors, setErrors] = useState({
        username: '',
        password: ''
    })

    const navigate = useNavigate()
    const [loginFn, { loading }] = useMutation(LOGIN_USER, {
        onError(err) {
            if (err.graphQLErrors && err.graphQLErrors.length > 0) {
                console.log(err.graphQLErrors[0]);
                const field = err.graphQLErrors[0].extensions.fieldName || undefined
                const message = err.graphQLErrors[0].message
                if (field) {
                    setErrors({
                        username: field === 'username' ? message : '',
                        password: field === 'password' ? message : ''
                    })
                } else {
                    enqueueSnackbar(message, {
                        variant: "error"
                    })
                }
            }
        },
        onCompleted(data) {
            console.log(data.login);
            setErrors({
                username: '',
                password: ''
            })
            setFormValues({
                username: '',
                password: ''
            })
            localStorage.setItem('access_token', JSON.stringify({
                token: data.login.accessToken,
                expiry: new Date().setMinutes(new Date().getMinutes() + 15)
            }))
            enqueueSnackbar('Login Successful', {
                variant: 'success'
            })
            navigate('/', {
                replace: '/',
                
            })
        }
    })



    const handleFormSubmit = (event) => {
        event.preventDefault()
        const validationErrors = loginValidation({
            username: formValues.username,
            password: formValues.password
        })

        if (Object.keys(validationErrors).length <= 0) {
            loginFn({
                variables: {
                    userInput: {
                        username: formValues.username,
                        password: formValues.password
                    }
                }
            })
        } else {
            setErrors({
                username: validationErrors.usernameErrors || '',
                password: validationErrors.passwordErrors || '',
            })
        }

    }

    return (<>
        <Header needAuthLinks/>
        <div className="login-page">
            <div className="lottie-container">
                <Lottie animationData={loginLottie} autoplay style={{ height: "16rem" }} />
            </div>

            <form onSubmit={(event) => handleFormSubmit(event)} className="login-form" method="post">
                <Stack spacing={3} className="form-content">
                    <Typography variant="body1" textAlign={"center"}>
                        Sign in your account
                    </Typography>
                    <TextField type="text" variant="outlined" label="Username/Email" name="username" value={formValues.username} required onChange={(e) => { setFormValues({ ...formValues, username: e.target.value }) }} fullWidth error={errors.username} helperText={errors.username} />
                    <TextField type="password" variant="outlined" label="Password" name="password" value={formValues.password} required onChange={(e) => { setFormValues({ ...formValues, password: e.target.value }) }} fullWidth error={errors.password} helperText={errors.password} />
                    <Button type="submit" variant="contained" fullWidth disabled={loading}>{loading ? 'Loading...' : 'Login'}</Button>
                </Stack>
            </form>
        </div>
        <Footer />
    </>
    )
}

export default Login