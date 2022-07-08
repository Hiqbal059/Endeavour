import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import profileimg from '../../Images/profileimg.png';
import { InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import Footer from '../Footer';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import cards from '../../Images/cards.png'
import ice from '../../Images/icecream.png';
import boxs from '../../Images/boxs.png'
import { GetIdeas } from '../API/API';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

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

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Edit Profile', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [ideas, setIdeas] = React.useState([])
  //   const handleOpenNavMenu = (event) => {
  //     setAnchorElNav(event.currentTarget);
  //   };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const navigation = useNavigate()
  const role = localStorage.getItem("role")
  const handleCloseNavMenu = (val) => {
    console.log(val)
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
      navigation("/")}
  };

  React.useEffect(() => {
    const all_ideas = GetIdeas({isAuthenticated: true, username: localStorage.getItem("username"), status: "active"})
    all_ideas
      .then((data) => {
        setIdeas(data.result)
        console.log(data.result)
      })
      .catch((error) => {
        return error;
      });
  }, []);

  const handleClick = (val) =>{
    console.log(val)
    navigation(`/review/${val}`)
  }
  return (
    <>
      <AppBar position="static" style={{ backgroundColor: 'white', padding: '30px' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              style={{ color: 'rgba(137, 137, 137, 1)' }}
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              onClick={()=>{navigation(`/${localStorage.getItem("role")}`)}}
            >
              ENDEAVOUR
            </Typography>
            {/* <InputGroup style={{ width: '470px' }}>
              <FormControl
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <Button style={{ borderP: '1px solid black', backgroundColor: 'rgba(233, 168, 0, 1)', color: 'white' }} id="button-addon2">
                Search
              </Button>
            </InputGroup> */}


            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >

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
                onClose={handleCloseUserMenu}
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

      <Container>
        <Col md={8} className="justify-content-center">
            <h5 className='btn btn-warning' style={{ padding: '10px 5px', fontWeight: "bold", fontSize:"25px", marginBottom: "5%", marginLeft: "52%" }}> Recently Submitted Ideas </h5>
        </Col>
        <Row>

          {ideas.map((idea)=>
            <Col md={4} className='btn btn-outline-success' onClick={()=>handleClick(idea.id)} style={{border: "5px"}}>
            <Card sx={{ maxWidth: 345, border: 2 }}>
              <CardHeader
                // avatar={
                //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    
                //   </Avatar>
                // }
                // action={
                //   // <IconButton aria-label="settings">
                //   //   <MoreVertIcon />
                //   // </IconButton>
                // }
                title={idea.title}
                subheader={idea.start_date}
              />
              
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {idea.description ? idea.description.substring(0, 100)+ "........" : "" }
                  
                </Typography>
              </CardContent>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
              
              </Collapse>
              <Row md={4}>
                <Col md={8}>
                  <button style={{ backgroundColor: 'green', border: ' none', padding: '8px', borderRadius: '8px', color: '#fff', margin:'12px 0px 5px 0px' }}> Approved by: {idea.approved_by}</button>
                </Col>
                <Col md={4}>
                  <button style={{ backgroundColor: 'green', border: ' none', padding: '8px', borderRadius: '8px', color: '#fff', margin:'12px 0px 0px 0px' }}> Likes: {idea.likes}</button>
                </Col>
              </Row>
            </Card>
          </Col>
          )}
        </Row>
        {/* <Row>
          <Col md={6}>
            <h5 style={{ padding: '25px 0px' }}> People like you also viewed </h5>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
              />
              <CardMedia
                component="img"
                height="194"
                src={ice}
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  This impressive paella is a perfect party dish and a fun meal to cook
                  together with your guests. Add 1 cup of frozen peas along with the mussels,
                  if you like.
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>

              </Collapse>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h5 style={{ padding: '25px 0px' }}> Your saved projects </h5>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
              />
              <CardMedia
                component="img"
                height="194"
                src={boxs}
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  This impressive paella is a perfect party dish and a fun meal to cook
                  together with your guests. Add 1 cup of frozen peas along with the mussels,
                  if you like.
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>

              </Collapse>
            </Card>
          </Col>
        </Row> */}
      </Container><br /><br />

      <Footer />

    </>
  );
};
export default ResponsiveAppBar;
