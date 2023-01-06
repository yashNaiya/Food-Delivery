import { Box, Typography } from '@mui/material'
import React from 'react'
import HistoryCard from './HistoryCard'

const OrderHistory = () => {
  return (
    <Box width={'70%'} paddingLeft={'2rem'}>
       <Typography borderBottom={'2px solid #a9927d'} fontSize={'large'} paddingBottom={'1rem'} color={'secondary.main'}>Order History</Typography>
       <HistoryCard/>
       <HistoryCard/>
       <HistoryCard/>
       <HistoryCard/>
    </Box>
  )
}

export default OrderHistory
