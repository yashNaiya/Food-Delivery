import { Box, Button, Menu, MenuItem, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react'
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const Open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleToronto = async () => {

        console.log('viewer1')
        setAnchorEl(null);
    };
    const handleKitchener = async () => {

        console.log('viewer2')
        setAnchorEl(null);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box paddingX={8} bgcolor={'secondary.main'} p={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Box>
                <Typography fontFamily={"'Lato', 'sans-serif'"} color={'#f2f4f3'} variant={'h5'}>The Bom|bay</Typography>
            </Box>
            <Box display={'flex'} justifyContent={'space-evenly'}>
                <Button
                    id="basic-button"
                    aria-controls={Open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={Open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{ display: { xs: "none", sm: "inherit" } }}
                    endIcon={<KeyboardArrowDownIcon />}
                >
                    city
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={Open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleToronto}>Toronto</MenuItem>
                    <MenuItem onClick={handleKitchener}>Kitchener</MenuItem>
                </Menu>
                <Button onClick={()=>{
                    navigate('/home')
                }}>
                    offers
                </Button>
                <Button onClick={()=>{
                    navigate('/cart')
                }}>
                    Cart
                </Button>
                <Button onClick={()=>{
                    navigate('/account')
                }}>
                    Account
                </Button>
            </Box>
        </Box>
    )
}

export default Navbar
