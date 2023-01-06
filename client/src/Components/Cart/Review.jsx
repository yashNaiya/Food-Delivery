import { Box, Typography } from '@mui/material'
import React from 'react'
import ReviewCard from './ReviewCard'
const Review = () => {
  return (
    <Box width={'50%'}>
        <Typography color="primary.main">Review Order</Typography>
        <ReviewCard/>
        <ReviewCard/>
        <ReviewCard/>
        <ReviewCard/>
    </Box>
  )
}

export default Review
