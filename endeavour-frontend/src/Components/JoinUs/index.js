import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./JoinUs.css"
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import Form2 from './Form2';
export default function JoinUs(props) {
  //   const [show, setShow] = useState(false);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const[msg, setMsg] = useState("")
  const [error, setError] = useState("")
  

  return (
    <>
      <Button variant="primary" onClick={props.handleShow} className="buttonModal px-5 py-2">
        Join Now
      </Button>

      <Modal show={props.show} onHide={props.handleClose} centered>
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
                      <input className='mb-2' type='text' placeholder='Enter Your Username' style={{ width: '100%', height: '40px', border: '1px solid #B1B1B1', padding: '5px', borderRadius: '4px' }} onChange={(e) => setUsername(e.target.value)} />
                    </Col>
                    <Col md={12}>
                      <input type='text' placeholder='Enter Your Email' style={{ width: '100%', height: '40px', border: '1px solid #B1B1B1', padding: '5px', borderRadius: '4px' }} onChange={(e) => setEmail(e.target.value)} />
                    </Col><br /><br />
                    {/* <Col md={12}>
                      <input type='password' placeholder='Enter Your Code' style={{ width: '100%', height: '40px', border: '1px solid #B1B1B1', padding: '5px', borderRadius: '4px' }} />
                    </Col><br /><br /> */}
                    <Col md={12}>
                      <Form2 email = {email} username = {username}/>
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
                      <p onClick={() => { props.handleClose(); props.signinShow();  }} style={{ fontSize: '13px', paddingLeft: '100px' }}> Already have an account ?  <span style={{ textDecoration: 'none', color: '#34D131', textDecoration: "underline", cursor: "pointer" }}>
                        Signin
                      </span> </p>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>

    </>
  );
}

