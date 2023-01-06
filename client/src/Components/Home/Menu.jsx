import { Box } from '@mui/material'
import React from 'react'
import Card from './Card'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import image from '../../Assets/pizza.jpg'
import burger from '../../Assets/burger.jpg'
import { Link } from 'react-scroll'

const Menu = () => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <Box
            maxWidth={'60%'}
            margin="50px auto"
            minHeight={'100vh'}
            display={'flex'}
            justifyContent={'space-around'}
            flexDirection={'column'}>
            <Box width={'300px'}>
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Menu" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Link to="pizza" spy={true} smooth={true} offset={50} duration={500}>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Pizza" />
                            </ListItemButton>
                        </Link>
                        <Link to="burger" spy={true} smooth={true} offset={50} duration={500}>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Burger" />
                            </ListItemButton>
                        </Link>
                    </List>
                </Collapse>
            </Box>

            <Box
                id={'pizza'}
                borderTop={'2px solid #a9927d'}
                paddingTop={8}
                margin="50px auto"
                minHeight={'100vh'}
                display={'flex'}
                flexDirection={'row'}
                flexWrap={'wrap'}
                justifyContent={'space-evenly'}
            >
                <Card image={image} />
                <Card image={image} />
                <Card image={image} />
                <Card image={image} />
                <Card image={image} />

            </Box>
            <Box
                id={'burger'}
                borderTop={'2px solid #a9927d'}
                paddingTop={8}
                margin="50px auto"
                minHeight={'100vh'}
                display={'flex'}
                flexDirection={'row'}
                flexWrap={'wrap'}
                justifyContent={'space-evenly'}
            >
                <Card image={burger} />
                <Card image={burger} />
                <Card image={burger} />
                <Card image={burger} />
                <Card image={burger} />
            </Box>

        </Box>
    )
}

export default Menu
