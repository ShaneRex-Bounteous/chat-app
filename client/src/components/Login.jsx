import Lottie from "lottie-react"
import Header from "./Header"
import { Button, Stack, TextField, Typography } from "@mui/material"
import Footer from "./Footer"
import "../styles/Login.css"
import loginLottie from "../assets/lotties/loginLottie.json"

const Login = () => {
    const handleFormSubmit = () => {

    }
    return (<>
    <Header />
        <div className="login-page">
            <div className="lottie-container">
                <Lottie animationData={loginLottie} autoplay style={{height: "16rem"}}/>
            </div>

            <form onSubmit={handleFormSubmit} className="login-form" method="post">
                <Stack spacing={2} className="form-content">
                    <Typography variant="body1" textAlign={"center"}>
                        Sign in your account
                    </Typography>
                    <TextField type="text" variant="outlined" label="Username/Email" name="username" />
                    <TextField type="password" variant="outlined" label="Password" name="password" />
                    <Button type="submit" variant="contained" fullWidth>Login</Button>
                </Stack>
            </form>
        </div>
        <Footer />
    </>
    )
}

export default Login