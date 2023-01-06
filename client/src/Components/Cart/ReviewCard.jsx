import { Box } from '@mui/system'
import React from 'react'
import Typography from '@mui/material/Typography'
import image from '../../Assets/pizza.jpg'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button } from '@mui/material';

const ReviewCard = () => {
    return (
        <Box sx={{ borderBottom: '2px solid #a9927d' }} justifyContent={'space-around'} minHeight={'8rem'} display={'flex'} flexDirection={'row'} marginY={'1rem'}>
            <Box
                m={'2%'}
                width={'50%'}
                sx={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: 'center'
                }}
            >
            </Box>
            <Typography m={'2%'} variant='caption'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate.
            </Typography>
            <Box display={'flex'} m={'2%'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'end'}>
                <Box display={'flex'} flexDirection={'row'}>
                    <Button
                    sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
                    <RemoveIcon />
                    </Button>
                    <Typography>1</Typography>
                    <Button
                    sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
                    <AddIcon />
                    </Button>
                </Box>
                <Typography >$13.99</Typography>
            </Box>
        </Box>
    )
}

export default ReviewCard