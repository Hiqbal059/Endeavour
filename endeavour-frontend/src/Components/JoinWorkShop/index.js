import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Container, Row,Col } from 'react-bootstrap';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import mentor from '../../Images/mentor.png';
import mentor2 from '../../Images/mentor2.png'
import detail from '../../Images/detail22.png';
import nameimg from '../../Images/nameimg.png'
import Footer from '../Footer';
import idea from '../../Images/idea.png'
import { Link } from 'react-router-dom';
import { GetSingleWorkshop, JoinNewWorkShop, InviteParticipants} from '../API/API';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { style } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';


const settings = ['Edit Profile','Dashboard', 'Logout'];
const pages = ["ENDEAVOUR"]
const JoinWorkShop = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [data, setData] = React.useState([])
  const navigation = useNavigate()
  const [link, setLink] = React.useState("")

  const role = localStorage.getItem("role")
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
  };

  React.useEffect(() => {
    const id = window.location.pathname.split("/").pop()
    console.log(id)
    const response = GetSingleWorkshop(id)
    response.then((data) => {
      console.log(data.result)
      setData(data.result)
    })
    .catch((error) => {
      return error;
    });
  }, [])

  const handleClick = () =>{
    console.log("000")
    navigation(`/${localStorage.getItem("role")}`)
  }
  
  const handleJoin = (val, price) =>{
    const data = {
      username: localStorage.getItem("username"),
      id: val
    }
    console.log(price)
    const response = JoinNewWorkShop(data)
    response.then((data) => {
      if(data.result){
        if(price===0){
          toast.success("You have been enrolled for this Workshop")
        }
        else if(localStorage.getItem("role") !== "entrepreneur"){
          toast.success("You have been enrolled for this Workshop for free")
        }
        else{
          navigation("/payment")
        }
      }
      else{
        toast.error(data.error)
      }
    })
    .catch((error) => {
      return error;
    });
    

  }
  const handleSend = () =>{
    console.log(link)
    const data = {
      workshop: window.location.pathname.split("/").pop(),
      username: localStorage.getItem("username"),
      link: link,
    }
    const response = InviteParticipants(data)
    .then((data)=>{
      console.log(data)
      toast.success(data.result)
      setLink("")
    })
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
                {/* <MenuItem key="Endeavour" onClick={()=>handleClick()}>
                  <Typography textAlign="center" ></Typography>
                </MenuItem> */}
                
            </Menu>
            
          </Box>
          
          {/* <button onClick={()=>handleClick()} style={{background: ""}}  className=" btn btn-success"><Typography textAlign="center" >Back to Home</Typography></button> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>handleClick()}
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
                <Avatar alt="Remy Sharp"/>
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
              onClose={()=>handleCloseUserMenu()}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={()=>handleCloseUserMenu(setting)}>
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
                  <Col md={12}>
                      <h1 style={{ paddingBottom: '20px',color: 'rgba(79, 79, 79, 1)', fontWeight: '700', float: 'left' }}> {data.title} </h1>
                      {(localStorage.getItem("role") !== "mentor") && <button className='btn btn-warning' style={{ textDecoration: 'none', fontSize: '20px', fontWeight: 'bold',fontFamily: 'Roboto Mono, monospace', margin: "5px", float: "right" }} onClick={()=>{handleJoin(data.id, data.charges)}}>Join</button>}
                      <button className='btn btn-info' style={{ backgroundColor: '#42a4f5', fontSize: '20px', fontWeight: 'bold',fontFamily: 'Roboto Mono, monospace', margin: "5px", float: "right" }}> {data.joiners+1}<PersonIcon/> participants</button>
                      {localStorage.getItem("username") === data.mentor_username &&
                        <div class="input-group my-3">
                          <input type="text" class="form-control py-3" placeholder="Send Meeting Link to all participants" aria-label="Send Meeting Link to all participants" aria-describedby="button-addon2"  value={link} onChange={(e) => setLink(e.target.value)}/>
                          <button class="btn btn-primary px-5" type="button" id="button-addon2" onClick={() => handleSend()}>Send</button>
                        </div>}
                    </Col>
                    <Col md={12} style={{ display: 'flex', justifyContent:'space-between' }}>
                      {/* <h1 style={{ paddingBottom: '20px',color: 'rgba(79, 79, 79, 1)', fontWeight: '700', float: 'left' }}> Workshop </h1> */}
                      
                      {(data?.charges === 0 || localStorage.getItem("role") !== "entrepreneur") && (localStorage.getItem("role") !== "mentor") && <h2 className='btn btn-warning' style={{ paddingBottom: '10px',color: 'rgba(79, 79, 79, 1)', fontWeight: '700', float: 'right' }}>Join it for free</h2>}
                      {(data?.charges !== 0 && localStorage.getItem("role") === "entrepreneur") && <h2 className='btn btn-warning' style={{ paddingBottom: '10px',color: 'rgba(79, 79, 79, 1)', fontWeight: '700', float: 'right' }}>Fee: {data.charges}</h2>}
                    </Col>
                    
                    <Col md={12}>
                    <h6 style={{ fontSize: '20px', paddingBottom: '10px', fontWeight: '400' }}> {data.about} </h6>
                    </Col>
                    <Col md={12}>
                      <img src={data.picture ? data.picture : idea} alt="Rectangle" style={{ paddingLeft: '30px', width: '50%' }} />     
                    </Col>
                  </Row>
                  <Row>
                      <Col md={12}>
                          <Row>
                              <Col md={12}>
                                  <h2 style={{ padding: '50px 0px', color: 'rgba(126, 126, 126, 1)', fontWeight:'700' }}> What you'll learn </h2>
                                 
                              </Col>
                              <Col md={12}>
                                    <ul style={{fontSize: "20px"}}>
                                      {data.description}
                                  </ul>
                              </Col>
                          </Row>
                      </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                        <h2 style={{ paddingTop: '40px',color: 'rgba(126, 126, 126, 1)', fontWeight:'700' }}> About this Workshop </h2>
                    </Col>
                    <Col md={8}>
                      <h2 style={{ paddingTop: '30px', color: 'rgba(126, 126, 126, 1)',fontFamily: 'Roboto Mono, monospace', fontSize: '20px' }}>
                      {data.about}
                      </h2>
                    </Col>
                  </Row>
                </Container>
                <br />

                <Container>
                  <Row>
                    <Col md={12}>
                      <h1 className='btn btn-info' style={{ fontSize: '25px', color: 'white' }}> Workshop Type </h1>
                    </Col>
                    <Col md={12}>
                      <h3 style={{ fontSize: '25px', color: '#2E2E2E', fontWeight: '700', fontWeight: "bold", marginLeft: "15px", marginBottom: "10%" }}> Training </h3>
                    </Col>
                  </Row>
                </Container>

                <Container>
                  <Row>
                    <Col md={12}>
                      <h1 className='btn btn-warning' style={{ paddingTop: '10px',color: 'black',fontSize: '25px', paddingBottom: '10px', fontWeight: '700' , margin: "30px 0px"}}> About Mentor </h1> 
                    </Col>
                  </Row>
                  <Row>
                    <Col md={2} >
                      <img src={data.mentor_picture ? data.mentor_picture : idea} style={{width: "150px", height: "150px", borderRadius: "50%"}} alt=""/>
                    </Col>
                    <Col md={4} >
                      <h2 style={{ color: 'rgba(0, 0, 0, 1)', fontWeight: '700' }}> {data.mentor_name} </h2>
                      <p style={{ color: 'rgba(0, 0, 0, 1)' }}> Strive for perfection </p>
                      <button className='btn btn-warning' style={{  padding: '5px 10px', backgroundColor: '#3267a8', color: 'white',marginTop: '3px', borderRadius: '4px', border: '1px solid rgba(165, 165, 165, 1)', fontSize: '20px' }}> Contact: {data.mentor_email} </button>
                    </Col>
                  </Row>
                  <Container style={{ padding: '60px 0px' }}>
                      <Row>
                        <Col md={8} style={{ border: '1px solid #757575', padding: '30px', borderRadius: '5px' }}>
                          <Row>
                            <Col md={6}>
                              <h4 style={{ fontWeight: '700', fontWeight: "bold" }}> From </h4>
                              <h4> Pakistan </h4>
                            </Col>
                            <Col md={6}>
                              <h4 style={{ fontWeight: '700', fontWeight: "bold" }}> Member Since </h4>
                              <h4> {data.mentor_date ? data.mentor_date.split(" ")[0]: 2021} </h4>
                            </Col>
                          </Row><br/>
                          <Row>
                            <Col md={12}>
                              <h4 style={{ fontWeight: '700', fontWeight: "bold" }}> Portfolio </h4>
                              <h4> {data.mentor_bio} </h4>
                            </Col>
                          </Row><br/>
                          <Row>
                            <Col md={12}>
                              <h4 style={{ fontWeight: '700', fontWeight: "bold" }}> Projects </h4>
                              <h4> {data.mentor_projects} </h4>
                            </Col>
                          </Row><br/>
                        </Col>
                      </Row>
                    </Container>          
                </Container><br/><br/>

                <Footer />
                <ToastContainer />

    </>
  );
};
export default JoinWorkShop;
