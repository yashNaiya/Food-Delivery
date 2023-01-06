import { Box, Typography, Button } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';

const HistoryCard = () => {
  return (
    <Box paddingY={'1rem'} borderBottom={'2px solid #a9927d'} minHeight={'8rem'} display={'flex'} justifyContent={'space-between'} flexDirection={'column'}>
        <Typography>1 veg loaded + 1 frech fries + 1 coke</Typography>
        <Box display={'flex'} width={'100%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Box width={'40%'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant='caption'>November 25,2022</Typography>
                <Typography variant='caption'>11:21 pm</Typography>
            </Box>
            <Button>
                <AddIcon />
                Add to cart
            </Button>
        </Box>
    </Box>
  )
}

export default HistoryCard
