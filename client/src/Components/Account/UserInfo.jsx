import { Box, Button, Typography, TextField } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom';
const UserInfo = (props) => {

  const navigate = useNavigate()

  const removeCookie = () =>{
    axios.post('/removeCookie',[])
    .then(res =>{
      // alert(res.data)
      navigate('/')
    })
  }
  const [edit, setEdit] = useState(false)
  const handleChange = (e) => {
    
    props.setrootUser((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value]
    }))

  }
  if (!edit) {
    return (
      <Box bgcolor={'#D3D3D3'} borderRadius={'1rem'} width={'30%'} height={'15rem'} display={'flex'} justifyContent={'space-evenly'} flexDirection={'column'} p={'1rem'}>
        <Box borderBottom={'2px solid #a9927d'} alignItems={'center'} display={'flex'} justifyContent={'space-between'} width={'100%'} flexDirection={'row'}>
          <Typography fontSize={'large'} fontWeight={'bold'}>{props.rootUser.name}</Typography>
          <Button onClick={() => {
            setEdit(true)
          }}>edit</Button>
        </Box>
        <Typography>{props.rootUser.email}</Typography>
        <Typography>{props.rootUser.number}</Typography>
        <Button fullWidth variant='contained'
        onClick={removeCookie}>Sign out</Button>
      </Box>
    )
  }
  else {
    return (
      <Box bgcolor={'#D3D3D3'} borderRadius={'1rem'} width={'30%'} height={'15rem'} display={'flex'} justifyContent={'space-evenly'} flexDirection={'column'} p={'1rem'}>
        <Box borderBottom={'2px solid #a9927d'} alignItems={'center'} display={'flex'} justifyContent={'space-between'} width={'100%'} flexDirection={'row'}>
        <TextField
        size='small'
          name='name'
          label="name"
          value={props.rootUser.name}
          onChange={handleChange}
        />
          <Button onClick={() => {
            axios.post('/edit',props.rootUser)
            .then(res =>{
              alert(res.data.message)
            })
            setEdit(false)
          }}>save</Button>
        </Box>
        <TextField
          size='small'
          name='email'
          label="email"
          value={props.rootUser.email}
          onChange={handleChange}
        />
        <TextField
          size='small'
          name='number'
          label="number"
          value={props.rootUser.number}
          onChange={handleChange}
        />
        <Button fullWidth variant='contained' 
        onClick={removeCookie}>Sign out</Button>
      </Box>
    )
  }

}

export default UserInfo
