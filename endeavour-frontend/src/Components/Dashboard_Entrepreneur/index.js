import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
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
import nameimg from '../../Images/nameimg.png'
import detital from '../../Images/allof.png';
import Footer from '../Footer';
import car from '../../Images/car.png';
import cards from '../../Images/cards.png'
import boxs from '../../Images/boxs.png'
import { Signin, GetWorkshops, GetIdeas, DeleteIdea, GetJoinedWorkShop, DeleteJoinedWorkShop } from '../API/API';
import { OneK } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Investor from '../Dashboard_Investor';

const role = localStorage.getItem("role")

const pages = ['Dashboard', 'Messages', 'Pitch Idea', 'Ideas', 'Workshops'];
const settings = ['Edit Profile', 'Dashboard', 'Logout'];

const preventDefault = (event) => event.preventDefault();

const Entrepreneur = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [user, setUser] = React.useState("")
    const [workshops, SetWorkShops] = React.useState([])
    const [ideas, setIdeas] = React.useState([])
    const [val, setVal] = React.useState([])

    const navigation = useNavigate()

    const flag = localStorage.getItem("flag")
    const role = localStorage.getItem("role")
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (val) => {
        if (val === "Messages") {
            navigation(`/message`)
        }
        else if (val === "Dashboard") {
            navigation(`/${role}`)
        }
        else if (val === 'Pitch Idea') {
            navigation("/newproject")
        }
        else if (val === 'Ideas') {
            navigation("/ideas")
        }
        else if (val === 'Workshops') {
            navigation("/workshops")
        }
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
        const body = {
            username: localStorage.getItem("username"),
            password: localStorage.getItem("pass")
        }
        const response = Signin(body);
        response
            .then((data) => {
                setUser(data.user)
            })
            .catch((error) => {
                return error;
            });

        const Workshops = GetJoinedWorkShop({ isAuthenticated: true, username: localStorage.getItem("username") })
        Workshops
            .then((data) => {
                SetWorkShops(data.result)
            })
            .catch((error) => {
                return error;
            });
        const all_ideas = GetIdeas({ isAuthenticated: true, username: localStorage.getItem("username") })
        all_ideas
            .then((data) => {
                setIdeas(data.result)
                console.log(data.result)
            })
            .catch((error) => {
                return error;
            });
    }, []);

    const handleView = (val) => {
        navigation(`/review/${val}`)
    }
    const handleDelete = (val) => {
        const response = DeleteIdea({ id: val })
        response.then((data) => {
            toast.error("Item deleted successfully")
            const all_ideas = GetIdeas({ isAuthenticated: true, username: localStorage.getItem("username") })
            all_ideas
                .then((data) => {
                    setIdeas(data.result)
                    console.log(data.result)
                })
                .catch((error) => {
                    return error;
                });

        })
            .catch((error) => {
                return error;
            });
    }
    const handleWorkshop = (val) => {
        navigation(`/join/${val}`)
    }

    const handleCancel = (val) =>{
        const data = {
            username: localStorage.getItem("username"),
            id: val
        }
        const response  = DeleteJoinedWorkShop(data)
        response.then((data) => {
            toast.error("Workshop has been removed")
            const Workshops = GetJoinedWorkShop({ isAuthenticated: true, username: localStorage.getItem("username") })
            Workshops
                .then((data) => {
                    SetWorkShops(data.result)
                })
                .catch((error) => {
                    return error;
                });
        })
        .catch((error) => {
            return error;
        });
    }

    return (
        <>
            {flag && role === "entrepreneur" &&
                <div>
                    <AppBar position="static" style={{ padding: '20px 50px', backgroundColor: 'white', }}>
                        <Container maxWidth="xl">
                            <Toolbar disableGutters>
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
                                        onClose={() => handleCloseNavMenu("")}
                                        sx={{
                                            display: { xs: 'block', md: 'none' },
                                        }}
                                    >
                                        {pages.map((page) => (
                                            <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                                                <Typography textAlign="center">{page}</Typography>
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
                                            key={page}
                                            onClick={() => handleCloseNavMenu(page)}
                                            style={{ color: 'rgba(112, 112, 112, 1)', fontWeight: '700', background: 'none' }}
                                            sx={{ my: 2, color: 'rgba(112, 112, 112, 1)', display: 'block' }}
                                        >
                                            {page}
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

                    <Container fluid style={{ backgroundColor: ' #E5E5E5', padding: '40px 70px' }}>
                        <Row>
                            <Col md={4}>
                                <Row>
                                    <Col md={12}>
                                        <Container style={{ backgroundColor: '#fff' }}>
                                            <Row>
                                                <Col md={12}>
                                                    <Row style={{ padding: '20px' }}>
                                                        <Col md={4}>
                                                            <img src={user.photo ? user.photo : nameimg} alt="" style={{width: "100px", height: "100px", borderRadius: "60px"}}/>
                                                        </Col>
                                                        <Col md={8}>
                                                            <h3 style={{ fontSize: '25px', color: 'rgba(64, 65, 69, 1)' }}> {user.first_name} {user.last_name} </h3>
                                                            <p className='btn btn-dark' style={{ fontSize: '20px', color: 'white' }}> {user.role ? user.role.toUpperCase() : ""} </p>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ borderTop: '1px solid rgba(112, 112, 112, 1)', borderBottom: '1px solid rgba(112, 112, 112, 1)' }}>
                                                        <Col md={12}>
                                                            <p style={{ paddingBottom: '30px', paddingTop: '10px', paddingLeft: '5px', paddingRight: '10px' }}> {user.bio} </p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={12}>
                                                            <h5 className='btn btn-secondary' style={{ fontSize: '22px', paddingTop: '3px', margin: '40px 10px 50px 50px' }}> Member Since {user.joining_date ? user.joining_date.split("T")[0] : ""}</h5>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Col>
                                </Row>
                                <br />
                                {/* <Row>
                                    <Col md={12}>
                                        <Container style={{ backgroundColor: '#fff' }}>
                                            <Row>
                                                <Col md={12}>
                                                    <Row style={{ padding: '10px 20px' }}>
                                                        <Col md={6}>
                                                            <h6 style={{ color: 'rgba(64, 65, 69, 1)' }}> Inbox </h6>
                                                        </Col>
                                                        <Col md={6}>
                                                        <Box
                                                            sx={{
                                                                typography: 'body1',
                                                                '& > :not(style) + :not(style)': {
                                                                ml: 2,
                                                                },
                                                            }}
                                                            onClick={preventDefault}
                                                            >
                                                                <div>
                                                                    <p>Sent by: {}</p>
                                                                    <p>From: {}</p>
                                                                    <p>Idea: {}</p>
                                                                    <p>Message: {} </p>
                                                                </div>
                                                            </Box>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Col>
                                </Row> */}
                            </Col>
                            <Col md={8}>
                                <Container style={{ backgroundColor: '#fff' }}>
                                    <Row>
                                        <Col md={12}>
                                            <h6 style={{ padding: '10px 0px', fontSize: "20px", fontWeight: "bold", margin: "9px" }}> Submited Ideas - ({ideas.length}) </h6>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            {ideas.map((idea) =>
                                                <Container style={{ borderBottom: '1px solid rgba(112, 112, 112, 1)' }}>
                                                    <Row className='m-auto' style={{ padding: '20px' }}>
                                                        <Col md={3}>
                                                                <img src={idea.photo ? idea.photo : iconimg} alt=""  style={{width: "140px", height: "100px", borderRadius: "10px"}}/>
                                                        </Col>
                                                        <Col md={3} className='m-auto'>
                                                            <h3 className='d-block' style={{ fontSize: '20px', fontWeight:"bold" }}> {idea.title} </h3>
                                                            {idea.status === "pending" &&
                                                                <button style={{ backgroundColor: 'rgba(255, 193, 7, 1)', border: ' none', padding: '0px 18px', borderRadius: '10px', color: '#fff' }}> {idea.status} </button>
                                                            }
                                                            {idea.status === "active" &&
                                                                <button style={{ backgroundColor: 'green', border: ' none', padding: '5px 5px', borderRadius: '8px', color: '#fff' }}>Approved by: {idea.approved_by} </button>
                                                                
                                                            }
                                                            {idea.status === "rejected" &&
                                                                <button style={{ backgroundColor: 'red', border: ' none', padding: '0px 18px', borderRadius: '10px', color: '#fff' }}> {idea.status} </button>
                                                            }
                                                        </Col>
                                                        <Col md={3}>
                                                            <Row style={{ paddingTop: '15px' }}>
                                                                <Col md={12}>
                                                                    <p style={{ fontSize: '20px', fontWeight: "bold" }}> Start Date </p>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md={12}>
                                                                    <p style={{ fontSize: '17px' }}>{idea.start_date}</p>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col md={3} className='m-auto'>
                                                            <Box
                                                                className='d-block'
                                                                style={{ paddingLeft: '20px' }}
                                                                sx={{
                                                                    typography: 'body1',
                                                                    '& > :not(style) + :not(style)': {
                                                                        ml: 0,
                                                                    },
                                                                }}
                                                                onClick={preventDefault}
                                                            >
                                                                <button className="px-3 py-2 btn btn-info d-block" style={{ textDecoration: 'none', color:"white", margin: "2px", width:"70%" }} onClick={() => handleView(idea.id)}>View</button>
                                                                <button className='px-3 py-2 btn btn-danger d-block' style={{ textDecoration: 'none', color:"white", margin: "2px", width:"70%" }} onClick={() => handleDelete(idea.id)}>Delete</button>
                                                            </Box>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            )}
                                        </Col>
                                    </Row>
                                </Container>
                                <br />
                                <Container style={{ backgroundColor: '#fff' }}>
                                    <Row style={{ padding: '20px 10px' }}>
                                        <Col md={12}>
                                            <Row>
                                                <Col md={12}>
                                                    <h3 style={{ fontSize: '20px' }}> Workshops Joined({workshops.length}) </h3>
                                                </Col>
                                            </Row>
                                            {workshops.map((workshop) =>
                                                // console.log(workshop)
                                                <Row style={{ padding: '20px 0px' }}>
                                                    <Col md={3}>
                                                        <img src={workshop.picture ? workshop.picture : detital} alt="car" style={{width: "140px", height: "100px", borderRadius: "10px"}}/>
                                                    </Col>
                                                    <Col md={3} className="m-auto">
                                                    <Row style={{ paddingTop: '15px' }}>
                                                            <Col md={12}>
                                                            <h6 className='d-block' style={{ color: 'rgba(0, 0, 0, 1)', fontWeight: '700', fontSize: "20px" }}> {workshop.title} </h6>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={12}>
                                                                <p className='btn btn-warning' style={{ fontSize: '10px' }}>Payment Pending</p>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col md={2}>
                                                        <Row style={{ paddingTop: '15px' }}>
                                                            <Col md={12}>
                                                                <p style={{ fontSize: '17px', fontWeight: "bold" }}> Start Date </p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={12}>
                                                                <p style={{ fontSize: '17px' }}>{workshop.date}</p>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col md={2} className='m-auto'>
                                                        <Box
                                                            className='d-block'
                                                            style={{ paddingLeft: '20px' }}
                                                            sx={{
                                                                typography: 'body1',
                                                                '& > :not(style) + :not(style)': {
                                                                    ml: 2,
                                                                },
                                                            }}
                                                            onClick={preventDefault}
                                                        >
                                                            <button className="px-3 py-2 btn btn-info d-block" style={{ textDecoration: 'none', color:"white", margin: "2px", width:"80%" }} onClick={() => handleWorkshop(workshop.id)}>View</button>
                                                            <button className='px-3 py-2 btn btn-danger d-block' style={{ textDecoration: 'none', color:"white", margin: "2px", width:"80%" }} onClick={() => handleCancel(workshop.id)}>Cancel</button>

                                                        </Box>
                                                    </Col>
                                                </Row>

                                            )}

                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                    <Footer />
                    <ToastContainer autoClose={2000}/>
                </div>
            }
            {role !== "entrepreneur" && <div>You are not authenticated </div>}

        </>
    );
};
export default Entrepreneur;
