import { Box, Button, styled, Typography } from '@mui/material'
import React from 'react'
import image from '../../Assets/landing.jpg'
import { NavLink } from 'react-router-dom';

const Landing = () => {

  const PageLink = styled(NavLink)({
    textDecoration:'none'
    })
  return (
    <Box display={'flex'} m={0} p={0} sx={{
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      height: "100vh",
    }}
      flexDirection={'column'} justifyContent="flex-start">

      <Box p={1} m={2} marginTop={7} display={'flex'} flexDirection='row' justifyContent={'space-evenly'} width='30%'>
          <PageLink to={'/login'}>
          <Button size='large' p={2}  variant='contained' sx={{ backgroundColor:'#f2f4f3', borderRadius: '1rem' ,textDecoration: 'none' }}>
            Login
          </Button>
          </PageLink>
        
        <PageLink to={'/register'} sx={{TextDecoder:'none'}}>
        <Button size='large' p={2} variant='contained' sx={{ borderRadius: '1rem' }}>Register</Button>
        </PageLink>
      </Box>
      <Box m={3} p={5} display={'flex'} flexDirection={'column'}>
        <Typography variant='h1' color={'third.main'} fontFamily={"'Lato', 'sans-serif'"}>
          Craving
        </Typography>
        <Typography variant='h1' color={'third.main'} fontFamily={"'Lato', 'sans-serif'"}>
          Something?
        </Typography>
        <Typography variant='h4' color={'#fff'}>
          Let's get you started!
        </Typography>
      </Box>
    </Box>
  )
}

export default Landing