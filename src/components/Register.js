import React, {useState} from "react";
import {registerUser} from '../api'
import "../style.css"
const Register = ({setToken, navigate}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async () => {
        const result = await registerUser(username, password)
        if(result.success){
            setToken(result.data.token);
            window.localStorage.setItem('token', result.data.token);
            navigate('./Profile')
        } else {
            console.log(result.error.message)
        }    
    }
    return (
        <form onSubmit={(event) => { 
        event.preventDefault();
        handleSubmit();
        }}>
            <input
            type='text'
            placeholder="Enter Username"
            className="inputs"
            onChange={(event) => setUsername(event.target.value)}
            ></input>
            <input
            type='password'
            placeholder="Enter Password"
            className="inputs"
            onChange={(event) => setPassword(event.target.value)}>
            </input>
            <button type='submit'>Submit</button>
        </form>
    )
}
export default Register