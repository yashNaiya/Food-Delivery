import { Box, Typography, TextField, Button, styled, } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios"
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
    // const url = `${BASE_URL}/login`
    const navigate = useNavigate()
    // console.log(url)
    const [inputs, setinputs] = useState({
        email: "",
        password: "",
    })
    const LandingLink = styled(NavLink)({
        color: 'primary'
    })
    const handleChange = (e) => {
        setinputs((prevState) => ({
            ...prevState,
            [e.target.name]: [e.target.value]
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = inputs
        if (email && password) {
            axios.post("https://yash-restaurant-backend.onrender.com/login", inputs)
                .then(res => {
                    // alert(res.data.message)
                    // console.log(res.data)
                    if (res.status === 200) {
                        navigate('/home')
                    }
                })
        } else {
            alert("Invalid Credientials")
        }

    }
    const handleReset = (e) => {
        setinputs({
            email: "", password: ""
        })
    }

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Box
                    display="flex"
                    flexDirection={'column'}
                    maxWidth={300}
                    alignItems="center"
                    justifyContent={"center"}
                    margin="auto"
                    marginTop={5}
                    padding={3}
                    borderRadius={5}
                    boxShadow={"5px 5px 10px #ccc"}
                    sx={{
                        ":hover": {
                            boxShadow: "10px 10px 20px #ccc"
                        }
                    }}
                >
                    <Box display="flex" sx={{ alignItems: "center" }}>
                        <LandingLink to={'/'}>
                            <ArrowBackIcon />
                        </LandingLink>
                        <Typography variant='h5' fontWeight={100} padding={3}>{"Login"}</Typography>
                    </Box>
                    <TextField
                        autoComplete='off'
                        value={inputs.email}
                        onChange={handleChange}
                        name='email'
                        size='small' margin='normal' type={"email"} placeholder='Email' />
                    <TextField
                        autoComplete='off'
                        name='password'
                        value={inputs.password}
                        onChange={handleChange}
                        size='small' margin='normal' type={"password"} placeholder='Password' />
                    <Button type="submit" variant='contained' sx={{ marginTop: 3 }}>{"Login"}</Button>
                    <Button sx={{ marginTop: 3 }} onClick={handleReset}>{"reset"}</Button>
                </Box>
            </form>
        </Box>
    )

}

export default Login
