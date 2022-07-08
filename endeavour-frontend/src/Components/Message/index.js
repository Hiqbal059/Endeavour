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
import { Signin, GetWorkshops, GetIdeas, DeleteIdea, GetMessages } from '../API/API';
import { OneK } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment'

import InvestorNavbar from "../InvestorNavbar";

const preventDefault = (event) => event.preventDefault();


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export default function Message() {
  const [expanded, setExpanded] = React.useState(false);

    const navigation = useNavigate()
    const pages = ['Dashboard', 'Messages', 'Pitch Idea', "Ideas"];
    const settings = ['Edit Profile', 'Dashboard', 'Logout'];
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const [msgData, setMsgData] = React.useState([]) 
    const handleCloseNavMenu = (val) => {
        if (val === "Messages") {
            navigation(`/${role}`)
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

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const flag = localStorage.getItem("flag")
    const role = localStorage.getItem("role")

    const [user, setUser] = React.useState([])

    const handleExpandClick = () => {
        setExpanded(!expanded);
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
        const data = {
            isAuthenticated: true,
            username: localStorage.getItem("username"),
            role: localStorage.getItem("role")
        }
        const chat = GetMessages(data)
        chat
        .then((data) => {
            console.log(data)
            setMsgData(data.result)
        })
        .catch((error) => {
          return error;
        });
      }, []);

    const handleClick = (num) =>{
        navigation(`/chat/${num}`)
    }
    
    return (
        <>
            <Typography
              variant="h6"
              noWrap
              component="div"
              style={{ color: 'rgba(137, 137, 137, 1)', margin:"30px" }}
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              onClick={()=>{navigation(`/${localStorage.getItem("role")}`)}}
            >
              ENDEAVOUR
            </Typography>
            {
                localStorage.getItem("role") === "investor" && (
                    <InvestorNavbar />
                )
            }
            {
                localStorage.getItem("role") === "entrepreneur" && (
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
                )
            }
            <div>
                <Container style={{ borderBottom: '1px solid rgba(112, 112, 112, 1)' }}>
                    <Row className='' style={{ padding: '20px' }}>
                        <Col md={6} className='d-flex justify-content-between align-items-center'>
                            <h3 className='d-block m-0' style={{ fontSize: '22px', fontWeight: "bold" }}> All Messages </h3>
                        </Col>
                    </Row>
                    <Row>
                        {msgData && msgData.map((msg)=> 
                            <Col md={4} className="p-2">
                            <Card className='btn btn-outline-info' sx={{ maxWidth: 345 }} style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', width: "345px", margin:"5px"}} onClick={()=>handleClick(msg.id)}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500], }} aria-label="recipe">
                                        </Avatar>
                                    }
                                    title={msg.post_name}
                                    subheader={moment(msg.time).format("YYYY-MM-DD")}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        <span style={{fontSize: "20px"}}>{msg.content}</span>
                                    </Typography>
                                </CardContent>

                                <Collapse in={expanded} timeout="auto" unmountOnExit>

                                </Collapse>
                            </Card>
                        </Col>
                        )}
                        
                    </Row>
                </Container>
            </div>
      </>
    )
}