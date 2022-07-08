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
import { useNavigate, useSearchParams } from 'react-router-dom';

import { CreateNewWorkshop } from '../API/API';
import { toast, ToastContainer } from 'react-toastify';

// import "./Overview.css"
const pages = [
    {
        name: "Dashboard",
        link: `/${localStorage.getItem("role")}`
    },
    {
        name: "Messages",
        link: ""
    },

]
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const preventDefault = (event) => event.preventDefault();

const CreateWorkshop = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [title, setTitle] = React.useState("")
    const [ description, setDescription] = React.useState("")
    const [fee, setFee] = React.useState("free")
    const [image, setImage] = React.useState("")
    const [charges, setCharges] = React.useState(0)
    const [date, setDate] = React.useState("")

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const navigation = useNavigate()
    
    const handlePublish = () =>{
        const data = {
            title: title,
            description: description,
            charges: charges,
            status: "active",
            username: localStorage.getItem("username"),
            date: date,
            image: image
        }
        const response = CreateNewWorkshop(data)
        response
          .then((data) => {
            if(data.message){
            toast.success(data.message)
            setTimeout(() => {
                renderHome()
              }, 3000)
        }
            else{
                toast.error(data.error)
            }
          })
          .catch((error) => {
            return error;
          });
    }
    const renderHome = () =>{
        navigation(`/${localStorage.getItem("role")}`)
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
            setImage(data.secure_url);
        })
        .catch((err) => console.log(err));
    };

    return (
        <>
        { localStorage.getItem("role") === "mentor" &&  
            <div>
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
                                    <Avatar src={"C:\\fakepath\\4.png"} />
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

            <Container fluid style={{ background: '#fff' }}>
                <Row style={{ padding: '10px 0px' }}>
                    <Col md={12}>
                        <Row style={{ position: "relative" }}>
                            <Col md={2}></Col>
                            {/* <Col md={2}>
                                <button style={{ float: 'left', borderRadius: '50%', padding: '0px 5px', fontSize: '10px', border: 'none', color: '#fff', background: '#C4C4C4', marginTop: '3px' }}> 1 </button>

                                <Link style={{ float: 'left', padding: '0px 5px', fontSize: '14px', color: 'gray', cursor: 'pointer', textDecoration: 'none' }} to='/newproject'>
                                    Overview & Description
                                </Link>
                            </Col> */}
                            {/* <Col md={2}>
                                <button style={{ float: 'left', borderRadius: '50%', padding: '0px 5px', fontSize: '10px', border: 'none', color: '#fff', background: '#C4C4C4', marginTop: '3px' }}> 2 </button>

                                <Link style={{ float: 'left', padding: '0px 5px', fontSize: '14px', color: 'gray', cursor: 'pointer', textDecoration: 'none' }} to='/'>
                                    Media File
                                </Link>
                            </Col> */}
                            <Col md={2} style={{ position: "absolute", right: "0", top: "-10px" }}>
                                <Link to='/ideabrief' style={{ textDecoration: 'none' }}>
                                    <span style={{ padding: '0px 5px', fontSize: '14px', color: 'blue', cursor: 'pointer', }} className='fw-bold'>Save & Preview</span>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

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
                                                    <Col md={3}>
                                                        <p className="d-block m-0 fw-bold text-" style={{ fontSize: "20px" }}>Workshop Title</p>
                                                    </Col>
                                                    <Col md={9}>
                                                        <input className='form-control' type='text' placeholder="Write The Title Of The Project" style={{ color: 'black', width: '100%', height: '80%', padding: '10px', border: '1px solid #C4C4C4', fontSize: '13px' }} onChange={(e)=>setTitle(e.target.value)}/>
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
                                                    <Col md={3}>
                                                        <p className="d-block m-0 fw-bold" style={{ fontSize: "20px" }}>Description</p>
                                                    </Col>
                                                    <Col md={9}>
                                                        <FloatingLabel controlId="floatingTextarea2" label="Briefly Describe Your Ideas" style={{ color: '#C4C4C4' }} onChange={(e)=>setDescription(e.target.value)}>
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
                                                <Row className='d-flex'>
                                                    <Col md={3}>
                                                        <p className="d-block m-0 fw-bold" style={{ fontSize: "20px" }}>Date</p>
                                                    </Col>
                                                    <Col md={9}>
                                                    <div class="input-group date" data-provide="datepicker" style={{width: "100%", margin: "auto", background: "white"}}>
                                                                    <input type="date" class="form-control" onChange={e=>setDate(e.target.value)}></input>
                                                                    <div class="input-group-addon">
                                                                        <span class="glyphicon glyphicon-th"></span>
                                                                    </div>
                                                    </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>

                                    </Container>
                                </Col>

                            </Row>
                            
                                <Container style={{ backgroundColor: '#fff', padding: '20px' }}>
                                    <h6 className='fw-bold'>Add Media</h6>
                                    <div className="mt-4" style={{ width: "200px", overflow: "hidden" }}>
                                        <input type="file" class="custom-file-input-1" onChange={e=>uploadImage(e.target.files)}/>
                                    </div>
                                    {/* <div className="row d-flex align-items-center">
                    <div className="col-2">
                      <h6 className='fw-bold d-block m-0'>VIDEO (one only)</h6>
                    </div>
                    <div className="col-10">
                      <input className='form-control' placeholder='https://www.youtube.com/watch?v=nLpWzJSyjkg' />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12">

                      <h6 className='fw-bold d-block m-0'>DOCUMENTS</h6>
                      <div className="my-4" style={{ width: "200px", overflow: "hidden" }}>
                        <input type="file" class="custom-file-input-2 custom-file-input-1" />
                      </div>
                    </div>
                  </div> */}
                                </Container>
                            <Row>
                                <Col md={12}>
                                    <Container style={{ backgroundColor: '#fff', padding: '20px' }}>
                                        <Row>
                                            <Col md={12}>
                                                <Row className="d-flex align-items-center">
                                                    <Col md={2}>
                                                        <p className="d-block m-0 fw-bold" style={{ fontSize: "20px" }}>Workshop Fee</p>
                                                    </Col>
                                                    <Col md={9}>
                                                        <Form.Select aria-label="Default select example" onChange={e => setFee(e.target.value)}>
                                                            <option value="free" style={{ color: '#C4C4C4' }}>Free</option>
                                                            <option value="paid" style={{ color: '#C4C4C4' }}>Paid</option>
                                                        </Form.Select>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            {
                                                fee === "paid" && (
                                                    <Col md={12}>
                                                        <Row className="d-flex align-items-center mt-4">
                                                            <Col md={2}>
                                                                <p className="d-block m-0 fw-bold" style={{ fontSize: "20px" }}>Paid Fee</p>
                                                            </Col>
                                                            <Col md={9}>
                                                                <input className='form-control' type='text' placeholder="Fee" style={{ color: 'black', width: '100%', height: '80%', padding: '10px', border: '1px solid #C4C4C4', fontSize: '16px' }} onChange={e=>setCharges(e.target.value)}/>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                )
                                            }

                                        </Row>
                                    </Container>
                                    
                                </Col>
                            </Row>
                            <Row>
                                {/* <input type="date" id="birthday" name="birthday"></input> */}

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
                                                                <Link to={`/${localStorage.getItem("role")}`} style={{ textDecoration: "none" }}>
                                                                    <Button variant="outlined" style={{ color: '#C4C4C4', border: ' 1px solid #C4C4C4', padding: '4px 15px' }}>Cancel</Button>
                                                                </Link>
                                                            </Col>
                                                            <Col md={6}>
                                                                <Button variant="contained" style={{ padding: '5px 22px' }} onClick={()=>handlePublish()}>Publish</Button>
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
            <ToastContainer
                autoClose={2000}
            />
            <Footer />
            </div>
        }
        {localStorage.getItem("role")!=="mentor" && 
            <p>Youre nor authenticated</p>
        }
        </>
    );
};
export default CreateWorkshop;