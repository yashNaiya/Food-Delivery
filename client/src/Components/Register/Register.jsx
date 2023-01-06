import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Register = () => {
    const handleChange = (e) => {
        setinputs((prevState) => ({
            ...prevState,
            [e.target.name]: [e.target.value]
        }))
    }

    const [inputs, setinputs] = useState({
        name: "",
        email: "",
        password: "",
        number: "",
        
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, number } = inputs
        if (name && email && password && number ) {
            console.log(inputs);
            axios.post("/register",inputs)
                .then(res => {
                    alert(res.data.message)
                })

        } else {
            alert("Invalid Input")
        }

    }
    return (
     
 <form onSubmit={handleSubmit} >
            <Box
                display='flex'
                bgcolor={'#fff'}
                flexDirection={'column'}
                alignItems='center'
                borderRadius={5}
               
                sx={{
                    ":hover": {
                        boxShadow: "2px 2px 4px #ccc"
                    }
                }}
                maxWidth={700}
                margin="auto"
                padding={3}
                >
                <Box display="flex" sx={{ alignItems: "center", margin: 'auto' }}>
                    <NavLink to={'/'}>
                        <ArrowBackIcon />
                    </NavLink>
                    <Typography variant='h5' fontWeight={100} padding={3}>Signup</Typography>
                </Box>
                <Box
                    display="flex"
                    flexDirection={'row'}
                    alignItems="center"
                    justifyContent={"space-evenly"}
                >

                    <Box display='flex' flexDirection={'column'} p={2}>
                        <TextField
                            inputProps={{ style: {color:'secondary' }}}
                            autoComplete='off'
                            name='name'
                            onChange={handleChange}
                            value={inputs.name}
                            size='small' margin='normal' type={"text"} placeholder='Name' />
                        <TextField
                            autoComplete='off'
                            name='number'
                            sx={{
                                '& .MuiOutlinedInput-input': {
                                    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                                        '-webkit-appearance': 'none',
                                    },
                                }
                            }}
                            onChange={handleChange}
                            value={inputs.number}
                            size='small' margin='normal' type={"number"} placeholder='Number' />
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
                    </Box>
                    
                   

                    {/* <Button sx={{ marginTop: 3 }} onClick={handleReset}>{"Signup"}</Button> */}
                </Box>
               
                <Button type="submit" variant='contained' sx={{ marginTop: 3 }}>Signup</Button>
            </Box>
        </form> 
    )
}

export default Register
