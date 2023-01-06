import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

const Summery = () => {
    return (
        <Box display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} width={'30%'} height={'20rem'} marginLeft={'5rem'} p={'2rem'} borderRadius={'1rem'} border={'2px solid #a9927d'} >
            <Typography fontWeight={'bold'} borderBottom={'2px solid #a9927d'}>Order Summery</Typography>
            <Box marginY={'1rem'} height={'40%'} display={'flex'} justifyContent={'space-evenly'} flexDirection={'column'}>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                    <Typography>Sub Total</Typography>
                    <Typography>$39.99</Typography>
                </Box>
                <Box borderBottom={'2px solid #a9927d'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                    <Typography>GST</Typography>
                    <Typography>$4.99</Typography>
                </Box>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                    <Typography fontWeight={'bold'}>Total</Typography>
                    <Typography fontWeight={'bold'} color={'third.main'}>$43.99</Typography>
                </Box>
            </Box>
                <TextField label={'special instructions(optional)'}></TextField>
                <Button fullWidth variant={'contained'}>place order</Button>
        </Box>
    )
}

export default Summery
