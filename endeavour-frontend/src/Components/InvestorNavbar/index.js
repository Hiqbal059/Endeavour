import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import investor from '../../Images/investor.png';
import { Container, Row, Col } from 'react-bootstrap';
import investor2 from '../../Images/investor2.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import "./InvestorNavbar.css"
export default function InvestorNavbar() {
    // const pages = ['Dashboard', 'Messages', 'Ideas'];
    const role = localStorage.getItem("role")
    const pages = [{
        name: "Dashboard",
        link: `/${role}`
    }, {
        name: "Message",
        link: `/message`
    }, {
        name: "Ideas",
        link: "/ideas"
    },
    {
        name: "Workshops",
        link: "/workshops"
    },

];
    const navigation = useNavigate()

    const settings = [{
        name: "Edit Profile",
        link: "/edit-profile"
    }, {
        name: "Dashboard",
        link: `/${localStorage.getItem("role")}`
    }, {
        name: "Logout",
        link: "/"
    }];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (val) => {
        setAnchorElNav(null);
        if(val === "Ideas"){
            navigation("/ideas")
        }
        else if(val === "Dashboard"){
            navigation(`/${role}`)
        }
        else if(val === "Favourite"){
            navigation(`/${role}`)
        }
        else if(val === "Logout"){
            localStorage.setItem("flag", false)
            localStorage.setItem("username", "")
            localStorage.setItem("pass", "")
            localStorage.setItem("role", "")
            navigation("/")
        }
    };

    const handleCloseUserMenu = (val) => {
        setAnchorElUser(null);
        if(val === "Edit Profile"){
            navigation("/edit-profile")
        }
        else if(val === "Dashboard"){
            navigation(`/${role}`)
        }
        else if(val === "Logout"){
            localStorage.setItem("flag", false)
            localStorage.setItem("username", "")
            localStorage.setItem("pass", "")
            localStorage.setItem("role", "")
            navigation("/")
        }
    };

    return (<>
        <AppBar className="inv-shadow" position="static" style={{ padding: '20px 50px', backgroundColor: 'white', }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography> */}

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            style={{ color: 'rgba(112, 112, 112, 1)' }}
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={()=>handleCloseNavMenu("")}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography> */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={()=>handleCloseNavMenu(page.name)}
                                style={{ color: 'rgba(112, 112, 112, 1)', fontWeight: '700', background: 'none' }}
                                sx={{ my: 2, color: 'rgba(112, 112, 112, 1)', display: 'block' }}
                            >
                               <Link to={page.link} style={{textDecoration: "none", color: "grey"}}>  <span>{page.name}</span></Link>
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={()=>handleCloseUserMenu("")}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.name} onClick={()=>handleCloseUserMenu(setting)}>
                                    <Link to={setting.link} style={{ textDecoration: "none", color: "grey" }}>
                                        <Typography textAlign="center">{setting.name}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    </>)
}