import { Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import "../styles/Header.css"
const Header = ({ needAuthLinks }) => {
    const handleLogout = () => {
        
    }
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
                            <li><Link to="/" className="nav-link">Home</Link></li>
                            <li><Link to="/profile" className="nav-link">Profile</Link></li>
                            <li><Button className="nav-link" onClick={handleLogout} disableRipple sx={{
                                "&.MuiButtonBase-root:hover": {
                                    bgcolor: "transparent"
                                },
                                textTransform: "none"
                            }}>Logout</Button></li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Header