import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../Navbar'
import Review from './Review'
import Summery from './Summery'
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

const Cart = () => {
    const navigation = useNavigate()
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Navbar />
            <Box marginX={'10%'} marginTop={'2rem'}>
                <Box borderBottom={'2px solid #a9927d'} display={'flex'} flexDirection={'row'}>
                    <Button onClick={()=>{
                        navigation('/home')
                    }}>
                        <ArrowBackIosNewRoundedIcon fontSize='15px'/>
                        Home
                    </Button>
                    <Typography m={'auto'} textAlign={'center'} variant={'h5'}>Cart</Typography>
                </Box>
                <Box marginTop={'2rem'} width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                    <Review />
                    <Summery />
                </Box>
            </Box>
        </Box>
    )
}

export default Cart
