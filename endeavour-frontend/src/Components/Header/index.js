import React, { useState } from 'react'
import './style.css'
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import card1 from '../../Images/card1.jpg';
import card2 from '../../Images/card2.jpg';
import card3 from '../../Images/card3.png'
import Footer from '../../Components/Footer';
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';
import JoinUs from '../JoinUs/index'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form2 from '../JoinUs/Form2';
import { Signin } from '../API/API';
import { AlternateEmail } from '@mui/icons-material';




const HomePage = () => {
  const navigate = useNavigate()
  const [joinShow, setJoinShow] = useState(false);
  const joinHandleClose = () => setJoinShow(false);
  const joinHandleShow = () => setJoinShow(true);
  const [form2Bool, setForm2Bool] = useState(false)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [modal, setModal] = useState(false)

  // const openSecondModal = () => {
  //   setModal(false)
  // }

  // const openModal = () => {
  //   setModal(true)
  // }

  const responseGoogle = (response) => {
    console.log(response);
  }
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const successMsg = (msg) => toast.success(msg);
  const errorMsg = (msg) => toast.alert(msg);

  const LoginUser = () =>{
    
  }
  const SigninUser = () => {
    // var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    // if (!pattern.test(email)) {
    //   // errorMsg("Invalid Email Entered")
    //   alert("Invalid Email")
    // }
    // else {
      const body = {
        username: email,
        password: password
      }
      const response = Signin(body);
      response
          .then((data) => {
            if (data?.user){
            localStorage.setItem("username", data.user.username)
            localStorage.setItem("role", data.user.role)
            localStorage.setItem("flag", true)
            localStorage.setItem("pass", data.user.password)
            navigate(`/${data.user.role}`)
            }
            else if (data?.alert){
              console.log(data)
              alert(data.alert)
              
            }
            })
            .catch((error) => {
              return error;
            });

  }


  return (
    <>
      <ToastContainer />

      <div className="main-container">
        <nav>
          <div className="logo text-uppercase">
            ENDEAVOUR
          </div>
          <input type="checkbox" id="click" />
          <label for="click" class="menu-btn">
            <i className="fas fa-bars"></i>
          </label>
          <ul>
            {/* <li><a href="#"> Show Case </a></li> */}
            <li><a href="#"> About Us </a></li>
            <li><a href="#" onClick={handleShow}> Sign In </a></li>
          </ul>
        </nav>

        <Container style={{ marginTop: '140px' }}>
          <Row>
            <Col md={12}>
              <h1 style={{ fontSize: '50px', color: 'white', fontFamily: 'Roboto Condensed, sans-serif', fontWeight: '500' }}> AN ACCELATOR TO <br /> YOUR STARTUP </h1>
              {/* <Button variant="primary" style={{ borderRadius: '30px', marginTop: '50px', fontFamily: 'Roboto Condensed, sans-serif', width: '150px' }}>Join Now</Button> */}
              <JoinUs setForm2Bool={setForm2Bool} handleClose={joinHandleClose} handleShow={joinHandleShow} show={joinShow} signinShow={handleShow} />
              {
                form2Bool && (
                  <Form2 />
                )
              }
            </Col>
          </Row>
        </Container>

      </div>


      <div className="main_container">
        <div className="text">
          <h2 style={{ fontSize: '22px', color: 'rgba(179, 179, 179, 1)', fontWeight: '700', paddingTop: '4px', fontFamily: 'Roboto Condensed, sans-serif' }}> TRUSTED BY : </h2>
        </div>
      </div>

      <br /> <br />

      <Container>
        <Row>
          <Col md={4}>
            <Row>
              <Col p-3 md={10}>
                <h2 style={{ color: 'rgba(78, 78, 78, 1)', fontSize: '30px', fontFamily: 'Roboto Condensed, sans-serif', fontWeight: '600' }}> STARTUP</h2>
                <p style={{ color: 'rgba(78, 78, 78, 1)', fontSize: '15px', fontFamily: 'Roboto Condensed, sans-serif' }}>
                  Are you a Pakistani startup looking for international partnerships and investment? The Startup Punjab Portal will offer you exposure to International investors, markets etc.
                </p>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col md={10}>
                <h2 style={{ color: 'rgba(78, 78, 78, 1)', fontSize: '30px', fontFamily: 'Roboto Condensed, sans-serif', fontWeight: '600' }}> INVESTOR</h2>
                <p style={{ color: 'rgba(78, 78, 78, 1)', fontSize: '15px', fontFamily: 'Roboto Condensed, sans-serif' }}>
                  Are you an investor looking for investment opportunities in Pakistani startup ecosystem? The Invest startup Punjab Portal will offer you a broad choice of viable projects..
                </p>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col md={10}>
                <h2 style={{ color: 'rgba(78, 78, 78, 1)', fontSize: '30px', fontFamily: 'Roboto Condensed, sans-serif', fontWeight: '600' }}>INCUBATION</h2>
                <p style={{ color: 'rgba(78, 78, 78, 1)', fontSize: '15px', fontFamily: 'Roboto Condensed, sans-serif' }}>
                  Plan9 conduct it's flagship event, The Launchpad, by which we induct 15 startups selected through our flagship competition..
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row style={{ marginTop: '100px', height: '75%' }}>
          <Col md={4} className="d-block">
            <Card style={{ border: 'none', paddingBottom: '10px', height: '80%' }} className="m-auto">
              <Card.Img variant="top" src={card1} />
              <Card.Body >
                <Card.Title style={{ top: '0', position: 'absolute' }}>

                  <Card.Title>

                  </Card.Title>
                </Card.Title>


              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="d-block">
            <Card style={{ border: 'none', paddingBottom: '10px' }} className="m-auto">
              <Card.Img variant="top" src={card2} />
              <Card.Body>
                <Card.Title style={{ position: 'absolute', top: '0', color: '#fff' }}></Card.Title>

              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="d-block">
            <Card style={{ border: 'none', paddingBottom: '10px' }} className="m-auto">
              <Card.Img variant="top" src={card3} />
              <Card.Body>
                <Card.Title style={{ position: 'absolute', top: '0', color: '#fff' }}></Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title style={{ color: '#464646', fontFamily: 'Roboto Condensed, sans-serif', fontWeight: '700', paddingLeft: '135px' }}> JOIN ENDEAVOUR</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Container>
            <Row>
              {/* <Col md={6} className="m-auto">
            <GoogleLogin
            style={{ marginLeft: '10px', border: '1px solid black' }}
    clientId=""
    buttonText="Continue With Google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
  />
            </Col> */}
            </Row>
          </Container>
          <Container style={{ marginTop: '0px' }}>
            <Row>
              <Col md={12}>
                <Container>
                  <Row>
                    <Col md={12} className="m-auto">
                      <div style={{ marginLeft: '140px' }}>

                      </div>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container><br /><br />
          <Container>
            <Row>
              <Col md={12}>
                <Container>
                  <Row>
                    <Col md={12}>
                      <input type='text' placeholder='Enter Your Username' style={{ width: '100%', height: '40px', border: '1px solid #B1B1B1', padding: '5px', borderRadius: '4px' }} onChange={e => setEmail(e.target.value)} />
                    </Col><br /><br />
                    <Col md={12}>
                      <input type='password' placeholder='Enter Your Password' style={{ width: '100%', height: '40px', border: '1px solid #B1B1B1', padding: '5px', borderRadius: '4px' }} onChange={e => setPassword(e.target.value)} />
                    </Col><br /><br />
                    <Col md={12}>
                      <Button variant="primary" size="sm" style={{ width: '100%', padding: '8px', borderRadius: '4px' }} onClick={() => SigninUser()} >
                        Sign In
                      </Button>

                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
          <br />
          <Container>
            <Row>
              <Col md={12}>
                <Container>
                  <Row>
                    <Col md={12}>
                      <p style={{ fontSize: '13px', paddingLeft: '50px' }}> By joining I agree to receive emails from Endeavour.</p>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>

        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col md={12}>
                <Container>
                  <Row>
                    <Col md={12}>
                      <p onClick={() => { handleClose(); joinHandleShow() }} style={{ fontSize: '13px', paddingLeft: '100px', cursor: "pointer" }}> Not have an Account?  <span style={{ textDecoration: 'none', color: '#34D131', cursor: "pointer", textDecoration: "underline" }}>
                        SignUp
                      </span> </p>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>




      <Footer />

    </>
  )
}

export default HomePage;