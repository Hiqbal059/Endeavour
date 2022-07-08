import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import iconimg from '../../Images/iconimg.png'
import { Container, Row, Col } from 'react-bootstrap';
import Footer from '../Footer';
import car from '../../Images/car.png';
import { NavLink } from 'react-router-dom';
import { Form, FloatingLabel } from 'react-bootstrap';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import "./Overview.css"
import { useNavigate } from 'react-router-dom';
import { CreateIdea } from '../API/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import foodImg from '../../Images/food.jpg';
import educationImg from '../../Images/education.jpg';
import technologyImg from '../../Images/technology.jpg';
import cosmeticImg from '../../Images/cosmetic.jpeg';
import handicraft from '../../Images/handicrafts.jpeg';
import automobile from '../../Images/automobile.jpeg';

const role = localStorage.getItem("role")
const pages = [
  {
    name: "Dashboard",
    link: `/${role}`
  },
  {
    name: "Messages",
    link: ""
  },
  {
    name: 'Pitch Idea',
    link: "/newproject"
  },
  {
    name: 'Ideas',
    link: "/ideas",
  }

]
const settings = ['Edit Profile', 'Dashboard', 'Logout'];

const preventDefault = (event) => event.preventDefault();

const NewProject = () => {
  const navigation = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [smeda, setSmeda] = React.useState("")
  const [category, setCategory] = React.useState("")
  const [funds, setFunds] = React.useState("")
  const [images, setImages] = React.useState("")
  const [video, setVideo] = React.useState("")
  const [documents, setDocuments] = React.useState("")


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (val) => {
        setAnchorElNav(null);
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

  const SubmitIdea = () =>{
    const data = {
      username: localStorage.getItem("username"),
      title: title,
      description: description,
      category: category,
      funds: funds,
      video: video,
      documents: documents,
      photo: images,
    }
    const response = CreateIdea(data)
    response.then((data)=>{
      if(data?.message){
        toast.success(data.message);
        // alert("Idea has been submitted successfully")
        navigation(`/${localStorage.getItem("role")}`)
      }
      else{
        toast.error(data.error);
      }
    })
    .catch((error) => {
      return error;
    });
    
  }
  const uploadImage = async (img) =>{
    console.log(img[0])
    const formdata = new FormData()
    formdata.append("file", img[0])
    formdata.append("upload_preset", "i0sywl1g")
    formdata.append("cloud_name", "endeavourucp")
    formdata.append("api_key", "844746733336826")

    fetch("https://api.cloudinary.com/v1_1/endeavourucp/image/upload", {
        method: "post",
        body: formdata
    })
        .then((resp) => resp.json())
        .then((data) => {
            setImages(data.secure_url);
        })
        .catch((err) => console.log(err));
    };

  return (
    <>
      <AppBar position="static" style={{ padding: '20px 50px', backgroundColor: 'white', }}>
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
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {/* {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))} */}
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
                <Link to={page.link} style={{ textDecoration: "none" }}>
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    style={{ color: 'rgba(112, 112, 112, 1)', fontWeight: '700', background: 'none' }}
                    sx={{ my: 2, color: 'rgba(112, 112, 112, 1)', display: 'block' }}
                  >
                    {page.name}
                  </Button>
                </Link>
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
                  <MenuItem key={setting} onClick={()=>handleCloseUserMenu(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container fluid style={{ backgroundColor: '#C4C4C4' }}>
        <Row>
          <Col md={12}>
            <Container style={{ padding: '60px' }}>
              <Row>
                <Col md={12}>
                  <Container style={{ backgroundColor: '#fff', padding: '20px' }}>
                    <Row>
                      <Col md={12}>
                        <Row className='d-flex align-items-center'>
                          <Col md={2}>
                            <p className="d-block m-0 fw-bold" style={{ fontSize: "20px" }}>IDEA TITLE</p>
                          </Col>
                          <Col md={9}>
                            <input className='form-control' type='text' placeholder="Write The Title Of The Project" style={{ color: 'black', width: '100%', height: '80%', padding: '10px', border: '1px solid #C4C4C4', fontSize: '13px' }} onChange={e=>setTitle(e.target.value)}/>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                  </Container>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Container style={{ backgroundColor: '#fff', padding: '20px' }}>
                    <Row>
                      <Col md={12}>
                        <Row className='d-flex align-items-center'>
                          <Col md={2}>
                            <p className="d-block m-0 fw-bold" style={{ fontSize: "20px" }}>SMEDA</p>
                          </Col>
                          <Col md={9}>
                            <input className='form-control' type='text' placeholder="Enter Registration No." style={{ color: 'black', width: '100%', height: '80%', padding: '10px', border: '1px solid #C4C4C4', fontSize: '13px' }} onChange={e=>setSmeda(e.target.value)} />
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                  </Container>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Container style={{ backgroundColor: '#fff', padding: '20px' }}>
                    <Row>
                      <Col md={12}>
                        <Row className='d-flex'>
                          <Col md={2}>
                            <p className="d-block m-0 fw-bold" style={{ fontSize: "20px" }}>Description</p>
                          </Col>
                          <Col md={9}>
                            <FloatingLabel controlId="floatingTextarea2" label="Briefly Describe Your Ideas" style={{ color: '#C4C4C4' }} onChange={e=>setDescription(e.target.value)}>
                              <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '190px' }}
                              />
                            </FloatingLabel>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                  </Container>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Container style={{ backgroundColor: '#fff', padding: '20px' }}>
                    <Row>
                      <Col md={12}>
                        <Row className="d-flex align-items-center">
                          <Col md={2}>
                            <p className="d-block m-0 fw-bold" style={{ fontSize: "20px" }}>Category</p>
                          </Col>
                          <Col md={9}>
                            <Form.Select aria-label="Default select example" onChange={(e) => setCategory(e.target.value)}>
                              <option style={{ color: '#C4C4C4' }} value="education">Education</option>
                              <option style={{ color: '#C4C4C4' }} value="technology">Technology</option>
                              <option style={{ color: '#C4C4C4' }} value="entertainment">Entertainment</option>
                              <option style={{ color: '#C4C4C4' }} value="handicraft">Handicraft</option>
                              <option style={{ color: '#C4C4C4' }} value="automobile">Auto Mobile</option>
                              <option style={{ color: '#C4C4C4' }} value="cosmetic">Cosmetic</option>
                              <option style={{ color: '#C4C4C4' }} value="food">Food</option>
                            </Form.Select>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                  </Container>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Container style={{ backgroundColor: '#fff', padding: '20px' }}>
                    <Row>
                      <Col md={12}>
                        <Row className="d-flex align-items-center">
                          <Col md={3}>
                            <p className="d-block m-0 fw-bold">
                              REQUIRED FUNDS / INVEST
                            </p>
                          </Col>
                          <Col md={9} className="d-flex align-items-center">
                            <input className='form-control' type='text' style={{ width: '40%', border: '1px solid #C4C4C4', borderRadius: '5px', float: 'left' }} onChange={e=>setFunds(e.target.value)}/>
                            <h6 className="d-block m-0  " style={{ paddingLeft: '15px' }}> <span className='fw-bold'>PKR</span> </h6>
                          </Col>
                        </Row>
                      </Col>

                    </Row>

                  </Container>
                </Col>

              </Row>
              <div >
                <Container style={{ backgroundColor: '#fff', padding: '20px' }}>
                  <h6 className='fw-bold'>SHOWCASE YOUR PROJECT IN A GALLERY</h6>
                  <div className="my-4" style={{ width: "200px", overflow: "hidden" }}>
                    <input type="file" class="custom-file-input-1" onChange={e=>uploadImage(e.target.files)}/>
                  </div>
                  <div className="row d-flex align-items-center">
                    <div className="col-2">
                      <h6 className='fw-bold d-block m-0'>VIDEO (one only)</h6>
                    </div>
                    <div className="col-10">
                      <input className='form-control' placeholder='https://www.youtube.com/watch?v=nLpWzJSyjkg' onChange={e=>setVideo(e.target.value)}/>
                    </div>
                  </div>

                </Container>
              </div>
              <Row>
                <Col md={12}>
                  <Container style={{ backgroundColor: '#fff', }}>
                    <Row>
                      <Col md={12}>
                        <Row>
                          <Col md={2}>

                          </Col>
                          <Col md={12}>
                            <FormControl>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                              >
                                <FormControlLabel value="female" control={<Radio />} label="Accept the terms & conditions of return policy." />
                              </RadioGroup>
                            </FormControl>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                  </Container>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Container style={{ backgroundColor: '#fff', padding: '20px' }}>
                    <Row>
                      <Col md={12}>
                        <Row>

                          <Col md={9}>

                          </Col>
                          <Col md={3}>
                            <Row>
                              <Col md={6}>
                                <Link to="/entrepreneur" style={{ textDecoration: "none" }}>
                                  <Button variant="outlined" style={{ color: '#C4C4C4', border: ' 1px solid #C4C4C4', padding: '4px 15px' }}>Cancel</Button>
                                </Link>
                              </Col>
                              <Col md={6}>
                                <Button onClick={SubmitIdea} variant="contained" style={{ padding: '5px 12px' }}>Submit Idea</Button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                  </Container>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
      <Footer />

    </>
  );
};
export default NewProject;