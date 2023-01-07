import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useEffect,useState } from 'react'

const UserInfo = (props) => {
  
  console.log(props.rootUser)
  return (
    <Box bgcolor={'#D3D3D3'} borderRadius={'1rem'} width={'30%'} height={'15rem'} display={'flex'} justifyContent={'space-evenly'} flexDirection={'column'} p={'1rem'}>
        <Box borderBottom={'2px solid #a9927d'} alignItems={'center'} display={'flex'} justifyContent={'space-between'} width={'100%'} flexDirection={'row'}>
            <Typography fontSize={'large'} fontWeight={'bold'}>Yash Naiya</Typography>
            <Button>edit</Button>
        </Box>
        <Typography>{props.rootUser.email}</Typography>
        <Typography>9081819007</Typography>
        <Button fullWidth variant='contained'>Sign out</Button>
    </Box>
  )
}

export default UserInfo
