import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Container, Row, Col } from 'react-bootstrap';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import iconimg from '../../Images/iconimg.png';
import rectangle from '../../Images/rectangle.png';
import './style.css'
import nameimg from '../../Images/nameimg.png'
import Footer from '../Footer';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GetSingleIdea, PostMessage, ApproveIdea, MarkFavorite } from '../API/API';
import { ArrowForwardIos } from '@mui/icons-material';
import Input from '../U';
import { ToastContainer, toast } from 'react-toastify';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const pages = ['ENDEAVOUR'];
const settings = ['Edit Profile', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigation = useNavigate()
  const [buttonVal, setButtonVal] = React.useState("Add to favorite")
  const role = localStorage.getItem("role")
  const [idea, setIdea] = React.useState([])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    navigation(`/${role}`)
  };

  const handleCloseUserMenu = (val) => {
    setAnchorElUser(null);
    if (val === "Edit Profile") {
      navigation("/edit-profile")
    }
    else if (val === "Dashboard") {
      navigation(`/${role}`)
    }
    else if (val === "Logout") {
      localStorage.setItem("flag", false)
      localStorage.setItem("username", "")
      localStorage.setItem("pass", "")
      localStorage.setItem("role", "")
      navigation("/")
    }
  }; window.location.pathname.split("/").pop()

  React.useEffect(() => {
    const id = window.location.pathname.split("/").pop()
    console.log(id)
    if(localStorage.getItem("role") !== "investor"){
      setButtonVal("Like")
    }
    const response = GetSingleIdea(id)
    response.then((data) => {
      console.log(data.result)
      setIdea(data.result)
    })
      .catch((error) => {
        return error;
      });
  }, [])

  const Approved = () => {
      const data = {
        isAuthenticated: true,
        username: localStorage.getItem("username"),
        post: idea.id,
        approve: true
      } 
      const message = ApproveIdea(data)
      message.then((data) => {
        console.log(data)
        toast.success(data?.message, {timeOut: 2000})
        setTimeout(() => {
          renderHome()
        }, 3000)
      })
      .catch((error) => {
        return error;
      });

  }

  const Rejected = () => {
    const data = {
      isAuthenticated: true,
      username: localStorage.getItem("username"),
      post: idea.id,
      approve: false
    } 
    const message = ApproveIdea(data)
    message.then((data) => {
      console.log(data)
      toast.error(data?.message, 3000)
      setTimeout(() => {
        renderHome()
      }, 3000)
    })
    .catch((error) => {
      return error;
    });
  }
  const renderHome = () =>{
    navigation(`/${role}`)
  }

  const [sendMsg, setSendMsg] = React.useState("")

  const handleSend = () =>{
    const data = {
      isAuthenticated: true,
      sender: localStorage.getItem("username"),
      post: idea.id,
      content: sendMsg
    }
    console.log(data)
    const message = PostMessage(data)
    message.then((data) => {
      console.log(data)
      if(data.message){
      toast.success(data.message)}
      else{
        toast.error(data.error)}
      
      setSendMsg('')
    })
      .catch((error) => {
        return error;
      });
  }

  const handleFavorite = (val) =>{
    const data = {
      username: localStorage.getItem("username"),
      id: val
    }
    const response = MarkFavorite(data)
    response.then((data) => {
      if(data.result){
        if(localStorage.getItem("role") !== "investor"){
          toast.success("Idea has been liked")}
        else{
          toast.success(data.result)}
        }
      else{
        if(localStorage.getItem("role") !== "investor"){
          toast.warning("Already Liked")}
        else{
          toast.warning(data.error)}
        }
        
      })
      .catch((error) => {
        return error;
      });

  }

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
                  <MenuItem key={page} onClick={()=>handleCloseNavMenu()}>
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
                  <Avatar alt="Remy Sharp" src={iconimg} />
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
                onClose={() => handleCloseUserMenu("")}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container style={{ padding: '30px', borderBottom: '1px solid rgba(141, 141, 141, 1)' }}>
        <Row>
          <Col md={6}>
            <h1 style={{ paddingBottom: '20px', color: 'rgba(79, 79, 79, 1)', fontWeight: '700' }}> {idea.title} </h1>
          </Col>
          <Col md={6}>
          <h2 className='btn btn-warning' style={{ paddingBottom: '10px',color: 'rgba(79, 79, 79, 1)', fontWeight: '700', float: 'right', fontSize: "25px" }}> Funds: {idea.funds} </h2>
          <h2 className='btn btn-secondary' style={{ paddingBottom: '10px',color: 'white', fontWeight: '700', float: 'right', fontSize: "25px", margin: "0px 7px" }} onClick={()=>{handleFavorite(idea.id)}}><ThumbUpIcon />{buttonVal} </h2>
          </Col>
          <Col md={12}>
            <img src={idea.photo ? idea.photo : rectangle} alt="Rectangle" style={{ paddingLeft: '30px', width: '50%' }} />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h2 style={{ paddingTop: '40px', color: 'rgba(126, 126, 126, 1)' }}> About this Idea </h2>
          </Col>
          <Col md={8}>
            <p style={{ fontSize: '22px', paddingTop: '10px', color: 'rgba(0, 0, 0, 1)', fontFamily: 'Roboto Mono, monospace' }}>
              {idea.description}
            </p>
          </Col>
        </Row>
      </Container>
      <br />

      <Container>
        <Row>
          <Col md={12}>
            <h1 style={{ fontSize: '25px', color: 'rgba(126, 126, 126, 1)' }}> Project Type </h1>
          </Col>
          <Col md={12}>
            <h3 style={{ fontSize: '18px', color: 'rgba(46, 46, 46, 1)' }}> {idea.category} </h3>
          </Col>
        </Row>
        <br /><br />
        <Row>
          <Col md={8}>
            <h1 style={{ paddingTop: '40px', color: 'rgba(126, 126, 126, 1)', fontSize: '25px' }}> Business Goal </h1>
            <p style={{ paddingTop: '30px', color: 'rgba(0, 0, 0, 1)', fontFamily: 'Roboto Mono, monospace', fontSize: '22px' }}>
              {idea.description}                     </p>
          </Col>
        </Row>
      </Container><br />
      <br />

      <Container className=''>
        <Row>
          <Col md={12}>
            <h1 className='btn btn-warning' style={{ paddingTop: '10px',color: 'black',fontSize: '25px', paddingBottom: '10px', fontWeight: '700' , margin: "30px 0px"}}> About Entrepreneur </h1>
          </Col>
        </Row>
        <Row className="d-flex align-items-center">
          <Col md={2} >
            <img src={idea.creator_photo ? idea.creator_photo : nameimg} alt="" style={{width: "150px", height: "150px", borderRadius: "50%"}}/>
          </Col>
          <Col md={4} >
            <h2 style={{ color: 'rgba(0, 0, 0, 1)', fontWeight: '700' }}> {idea.creator_name ? idea.creator_name : ""} </h2>
            <button className='btn btn-warning' style={{  padding: '5px 10px', backgroundColor: '#3267a8', color: 'white',marginTop: '3px', borderRadius: '4px', border: '1px solid rgba(165, 165, 165, 1)', fontSize: '20px' }}> Contact:  {idea.creator_email ? idea.creator_email : ""}</button>
            <span className='btn btn-warning' style={{  padding: '5px 10px', backgroundColor: '#3267a8', color: 'white',marginTop: '3px', borderRadius: '4px', border: '1px solid rgba(165, 165, 165, 1)', fontSize: '20px' }}><span className='fw-bold'>Linkedin: </span>{idea?.creator_linkedin}</span>
          </Col>
          <Col md={6} >
          {role !== "entrepreneur" &&
            <div class="input-group my-3">
              <input type="text" class="form-control py-2" placeholder="Send message to Creator" aria-label="Send message to Creator" aria-describedby="button-addon2"  value={sendMsg} onChange={(e) => setSendMsg(e.target.value)}/>
              <button class="btn btn-outline-primary px-5" type="button" id="button-addon2" onClick={() => handleSend()}>Send</button>
            </div>}
            { role === "mentor" &&
            <div className='d-flex justify-content-end'>
              <button className="px-3 py-2 btn btn-success" style={{border: "none",}} onClick={() => Approved()}>Approved</button>
              <button className="px-3 py-2 mx-2 btn btn-danger" style={{border: "none",}} onClick ={() => Rejected()}>Rejected</button>
            </div>}
          </Col>
        </Row>
      </Container><br /><br />
      <Container style={{ padding: '60px 0px' }}>
          <Row>
            <Col md={12} style={{ border: '1px solid #757575', padding: '30px', borderRadius: '5px' }}>
              <Row>
                <Col md={12}>
                  <h4 style={{ fontWeight: '700', fontWeight: "bold" }}> Portfolio: </h4>
                  <h4> {idea.creator_bio} </h4>
                </Col>
              </Row><br/>
            </Col>
          </Row>
        </Container>  
      <ToastContainer 
        autoClose={2000}
      />
      <Footer />

    </>
  );
};
export default ResponsiveAppBar;
