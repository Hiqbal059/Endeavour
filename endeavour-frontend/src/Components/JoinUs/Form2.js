import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./JoinUs.css"
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Signup, VerifyEmail } from '../API/API';
import { RepeatOneSharp } from '@mui/icons-material';
import {useNavigate} from "react-router-dom"

export default function Form2(props) {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const signUp = async () => {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if (!pattern.test(props.email)) {
      alert("Enter Valid Email")
    } else {
      const data = {
        username: props.username,
        email: props.email
      }

      console.log("The data is: ", data)
      const response = await Signup(data);
      console.log("Signup Response: ", response)
      if (response?.message) {
        alert(response.message)
        localStorage.setItem("username", props.username)
        handleShow()
      } else if (response?.error) {
        alert(response.error)
      }
    }

  }

  const [code, setCode] = useState("")

  const verify = async () => {
    const data = {
      code: parseInt(code),
      username: localStorage.getItem("username")
    }
    const response = await VerifyEmail(data)
    console.log("Verify Response: ", response)

    if (response?.error) {
      alert(response.error)
    } else if (response?.message) {
      alert(response.message)
      navigate("/profile")
    }

  }


  return (
    <>

      <Button variant="primary" onClick={signUp} className="w-100 my-2 px-5 py-2">
        Continue
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        {/* <Modal.Header>
          <Modal.Title style={{ color: '#464646', fontFamily: 'Roboto Condensed, sans-serif', fontWeight: '700', paddingLeft: '135px' }}> JOIN ENDEAVOUR</Modal.Title>
        </Modal.Header> */}
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
                    {/* <Col md={12}>
                      <input type='text' placeholder='Enter Your Email' style={{ width: '100%', height: '40px', border: '1px solid #B1B1B1', padding: '5px', borderRadius: '4px' }} />
                    </Col><br /><br /> */}
                    <Col md={12}>
                      <input onChange={(e) => setCode(e.target.value)} type='text' placeholder='Enter Your Code' style={{ width: '100%', height: '40px', border: '1px solid #B1B1B1', padding: '5px', borderRadius: '4px' }} />
                    </Col><br /><br />
                    <Col md={12}>
                      <Button variant="primary" size="sm" style={{ width: '100%', padding: '8px', borderRadius: '4px' }} onClick={verify}>
                        Verify
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
        {/* <Modal.Footer>
          <Container>
            <Row>
              <Col md={12}>
                <Container>
                  <Row>
                    <Col md={12}>
                      <p onClick = {() => {props.handleClose(); props.signinShow();}}style={{ fontSize: '13px', paddingLeft: '100px' }}> Already have an account ?  <span  style={{ textDecoration: 'none', color: '#34D131', textDecoration: "underline", cursor: "pointer" }}>
                        Signin
                    </span> </p>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Modal.Footer> */}
      </Modal>

    </>
  );
}

