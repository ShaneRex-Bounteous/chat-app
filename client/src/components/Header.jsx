import { Typography } from "@mui/material"
import "../styles/Header.css"
import { Link } from "react-router-dom"
const Header = (needAuthLinks) => {
    return (
        <div className="header">
            <div className="header-logo">
                <Typography variant="h6">
                    ChatApp
                </Typography>
            </div>
            <div className="navbar-container">
                <ul className="navbar">
                    {needAuthLinks ? (
                        <>
                            <li><Link to="/register" className="nav-link">Register</Link></li>
                            <li><Link to="/login" className="nav-link">Login</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/" className="nav-link"><Typography variant="h6">Home</Typography></Link></li>
                            <li><Link to="/profile" className="nav-link"><Typography variant="h6">Profile</Typography></Link></li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Header