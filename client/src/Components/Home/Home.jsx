import { Box } from '@mui/system'
import React from 'react'
import Navbar from '../Navbar'
import Menu from './Menu'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Home = () => {

  const [rootUser, setrootUser] = useState()
  const navigate = useNavigate()
 
  useEffect(() => {
    axios('/home')
            .then(res => setrootUser(res.rootUser))
            .catch(err => {
              console.log(err)
              navigate("/login")
            })
  }, [])
  
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Navbar />
      <Menu />
    </Box>
  )
}

export default Home