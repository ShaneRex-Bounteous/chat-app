import { useMutation } from "@apollo/client"
import { Button, Stack, TextField, Typography } from "@mui/material"
import Lottie from "lottie-react"
import { useState } from "react"
import loginLottie from "../assets/lotties/loginLottie.json"
import { LOGIN_USER } from "../graphql/mutations/userMutations"
import "../styles/Login.css"
import Footer from "./Footer"
import Header from "./Header"
import { loginValidation } from "../utils/ValidateInputs"

const Login = () => {

    const [loginFn, { data, loading }] = useMutation(LOGIN_USER, {
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
                    console.log(message);
                }
            }
        }
    })

    const [formValues, setFormValues] = useState({
        username: '',
        password: ''
    })

    const [errors, setErrors] = useState({
        username: '',
        password: ''
    })

    const handleFormSubmit = async(event) => {
        event.preventDefault()
        const validationErrors = loginValidation({
            username: formValues.username,
            password: formValues.password
        })

        if(Object.keys(validationErrors).length <= 0) {
            await loginFn({
                variables: {
                    userInput: {
                        username: formValues.username,
                        password: formValues.password
                    }
                }
            })
            if(data) {
                console.log(data);
                setFormValues({
                    username: '',
                    password: '',
                })
                setErrors({
                    username: '',
                    password: '',
                })
            }
        } else {
            setErrors({
                username: validationErrors.usernameErrors || '',
                password: validationErrors.passwordErrors || '',
            })
        }
    }

    return (<>
        <Header />
        <div className="login-page">
            <div className="lottie-container">
                <Lottie animationData={loginLottie} autoplay style={{ height: "16rem" }} />
            </div>

            <form onSubmit={(event) => handleFormSubmit(event)} className="login-form" method="post">
                <Stack spacing={3} className="form-content">
                    <Typography variant="body1" textAlign={"center"}>
                        Sign in your account
                    </Typography>
                    <TextField type="text" variant="outlined" label="Username/Email" name="username" value={formValues.username} required onChange={(e) => { setFormValues({ ...formValues, username: e.target.value }) }} fullWidth error={errors.username} helperText={errors.username}/>
                    <TextField type="password" variant="outlined" label="Password" name="password" value={formValues.password} required onChange={(e) => { setFormValues({ ...formValues, password: e.target.value }) }} fullWidth error={errors.password} helperText={errors.password}/>
                    <Button type="submit" variant="contained" fullWidth disabled={loading}>{loading ? 'Loading...' : 'Login'}</Button>
                </Stack>
            </form>
        </div>
        <Footer />
    </>
    )
}

export default Login