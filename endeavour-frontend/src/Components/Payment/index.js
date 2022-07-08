import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Container, Row,Col, Form } from 'react-bootstrap';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import mentor from '../../Images/mentor.png'
import Footer from '../Footer';
import dot from '../../Images/dot.png'
import { Navigation } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


const pages = ['ENDEAVOUR'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Payment = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const navigation = useNavigate()

  const role = localStorage.getItem("role")
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    navigation(`/${role}`)
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    toast.success("You have been added to participants, pay to confirm")}, 
  [])

  return (
    <>
      <AppBar position="static" style={{ background: 'transparent', padding: '20px 60px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="lg"
              style={{ color: 'black' }}
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
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                style={{ background: 'none', color: 'rgba(126, 126, 126, 1)', fontWeight: '700' }}
                sx={{ my: 2, color: 'rgba(126, 126, 126, 1)', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={mentor} />
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
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

              

               

               <Container style={{ padding: '100px 20px' }}>
                   <Row>
                       <Col md={12}>
                           <h2 style={{ color: '#2A61F5', fontSize: '40px', fontWeight: '700',fontFamily: 'Roboto Condensed, sans-serif' }}> Add Easypaisa </h2>
                       </Col>
                   </Row>
                   <Container>
                   <Row>
                       <Col md={9} style={{ border: '1px solid #B5B5B5', padding: '20px 20px', borderRadius: '4px' }}>
                           <h3 style={{ color: '#2A61F5',fontFamily: 'Roboto Condensed, sans-serif' }}> Payment Method </h3>
                           <Row style={{ padding: '20px 0px' }}>
                               <Col md={12}>
                               <img src={dot} style={{ float: 'left', height: '8px', marginTop: '6px', borderRadius: '50%' }} alt="Dotimage" />
                               <h3 style={{ float: 'left', fontSize: '16px', paddingLeft: '10px', color: '#2A61F5', fontWeight: '400' }}> EasyPaisa/Jazzcash </h3>
                               </Col>
                           </Row>
                           <Row>
                             <h4>Send payment to this account and add TXN to verify</h4>
                               <Col md={4}>
                               <Form.Control style={{ border: '1px solid #AEAEAE', borderRadius: '5px' }} size="sm" type="text" placeholder="03414175075" disabled/>
                               </Col>
                           </Row><br/>
                           <Row>
                               <Col md={4}>
                               <Form.Control style={{ border: '1px solid #AEAEAE', borderRadius: '5px' }} size="sm" type="text" placeholder="Enter Transaction No." />
                               </Col>
                           </Row><br/>
                            <br/>
                           <Row>
                               <Col md={4}>
                               <Button style={{ width: '100%', backgroundColor: '#2A61F5', color: '#fff' }}>Verify</Button>
                               </Col>
                           </Row>
                       </Col>
                   </Row>
               </Container>
               </Container>

               

                <Footer />
                <ToastContainer />

    </>
  );
};
export default Payment;
