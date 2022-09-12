import {React, Fragment } from "react";
import { Link } from "react-router-dom";
import "../style.css"


const Navbar = ({setToken, token}) => {
    return (
        <nav>
                <Link to='/' style={{backgroundColor:"#f14e4e"}}>Home</Link>
                <Link to='/posts' style={{backgroundColor:"#f1bb4e"}}>Posts</Link>
                {token ? (
                <>
                <Link to='/profile' style={{backgroundColor:"#84f14e"}}>Profile</Link>
                <Link to='/'  onClick={() => {
                    window.localStorage.removeItem('token');
                    setToken('')
                    }} style={{backgroundColor:"#4ef18f"}}>Logout</Link>
                <Link to="/posts/createpost" style={{backgroundColor:"#4e9af1"}}>Create Post</Link>
                </>
                ) : (
                <>
                <Link to='/register' style={{backgroundColor: "#9a4ef1"}} >Register</Link>
                <Link to='/login' style={{backgroundColor:"#f14ebd"}}>Login</Link>
                </>
                )
                }
        </nav>
    )
}

export default Navbar