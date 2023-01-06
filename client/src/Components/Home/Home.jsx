import { Box } from '@mui/system'
import React from 'react'
import Navbar from '../Navbar'
import Menu from './Menu'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [rootUser, setrootUser] = useState()
  const navigate = useNavigate()
  const callHomePage = async ()=>{
    try{
      const res = await fetch('/home',{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      });

      const data = await res.json()
      setrootUser(data.rootUser)
      // console.log(data)

      if(!res.status === 200){
        throw new Error(res.error)
      }

    }catch(err){
      console.log(err)
      navigate("/login")
    }
  }
  useEffect(() => {
    callHomePage();
  }, [])
  
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Navbar />
      <Menu />
    </Box>
  )
}

export default Home