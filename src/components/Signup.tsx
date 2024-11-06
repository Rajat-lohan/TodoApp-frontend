import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useSetRecoilState} from "recoil";
import {authState} from "../store/authState.js";
import {Button, Card, TextField, Typography} from '@mui/material';
import { red } from '@mui/material/colors';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        // Todo: Create a type for the response that you get back from the server
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token)
            window.location.href = "/todos";
        } else {
            alert("Error while signing up");
        }
    };

    return (
        <div style={{backgroundColor:'beige'}}>
            <Card>
            <div style={{justifyContent: "center", display: "flex",flexDirection:'column'}}>
                <div style={{textAlign:'center'}}>
                <Typography variant='h6'>Signup to create your account</Typography>
                    <br/><br/>
                </div>
                <TextField onChange={(e) => setUsername(e.target.value)} variant='outlined' label='Username' />
                <TextField onChange={(e) => setPassword(e.target.value)} variant='outlined' label='password' type='password' />
                <Button onClick={handleSignup}>Signup</Button>
                <div style={{color:'red'}}>
                Already signed up? <Link to="/login">Login</Link>
                </div>
            </div>
            </Card>
        </div>
    );
};

export default Signup;
