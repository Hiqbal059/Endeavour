import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Footer from '../Footer';
import Input from '../U';
import './profile.css';
import { Link } from 'react-router-dom'
import { UpdateUser } from '../API/API';

import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigation = useNavigate()
    localStorage.setItem("flag", true)
    const AddRemoveClass = (id1, id2) => {
        const div1 = document.getElementById(id1)
        const div2 = document.getElementById(id2)

        div1.classList.add("active")
        div1.classList.remove("remove")

        div2.classList.add("remove")
        div2.classList.remove("active")
    }


    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [contact, setContact] = useState("")
    const [pass, setPass] = useState("")
    const [cPass, setCPass] = useState("")
    const [url, setUrl] = useState("")


    const createProfile = async () => {
        if (cPass == pass) {
            localStorage.setItem("role", IAM)
            localStorage.setItem("pass", pass)
            const data = {
                first_name: fname,
                last_name: lname,
                phone: contact,
                role: IAM,
                password: pass,
                isAuthenticated: localStorage.getItem("flag"),
                username: localStorage.getItem("username"),
                linkedin_link: url,
                projects: "",
                bio: "",
                designation: IAM,
                city: ""
            }
            console.log(data)
            const response = await UpdateUser(data)
            console.log("response profile: ", response)

            if (response?.message) {
                alert(response.message);
                localStorage.setItem("role", IAM)
                if (IAM === "investor") {
                    // navigate("investor")
                    navigation("/investor")
                    
                } else {
                    navigation("/entrepreneur")
                }
            } else if(response?.error) {
                alert(response.error)
            }

        } else {
            alert("Password and Confirm Password doesn't match")
        }
    }


    const [IAM, setIAM] = useState("")
    localStorage.setItem("role", IAM)
    return (
        <>
            <Container fluid style={{ borderBottom: '1px solid rgba(177, 177, 177, 1)' }}>
                <Row>
                    <Col md={12}>
                        <h2 style={{ padding: '40px 90px', color: 'rgba(137, 137, 137, 1)', fontWeight: '700', fontSize: '20px' }}> ENDEAVOUR </h2>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col md={12}>
                        <h1 style={{ paddingLeft: '10px', paddingTop: '40px', color: 'rgba(64, 65, 69, 1)', fontWeight: '400' }}> Create Your Profile </h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={9} style={{ padding: '30px' }}>
                        <Row md={{ offset: 3, span: 6 }}>
                            <Col md={6}>
                                <Input
                                    label="First Name"
                                    placeholder="First Name"
                                    type="text"
                                    onChange={(e) => setFname(e.target.value)}
                                />
                            </Col>
                            <Col md={6} style={{ paddingTop: '7px' }}>
                                <Input
                                    placeholder="Last Name"
                                    type="text"
                                    onChange={(e) => setLname(e.target.value)}

                                />
                            </Col>
                        </Row>
                        <Row md={{ offset: 3, span: 6 }}>
                            <Col md={6}>
                                <label style={{ color: "grey" }}>
                                    Username
                                </label>
                                <input className='form-control my-2' placeholder={localStorage.getItem("username")} disabled={true} />

                            </Col>
                            <Col md={6}>
                                <Input
                                    label="Contact Number"
                                    className="form-control"
                                    placeholder="03120099009"
                                    // pattern="\d*" 
                                    pattern="/^-?\d+\.?\d*$/"
                                    onChange={(e) => setContact(e.target.value)}
                                    required={true}
                                />
                            </Col>
                        </Row>
                        <Row md={{ offset: 3, span: 6 }}>
                            <Col md={6}>
                                <Input
                                    label="Password"
                                    placeholder="Password"
                                    type="password"
                                    
                                    onChange={(e) => setPass(e.target.value)}
                                    required

                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    label="Confirm Password"
                                    placeholder="Confirm Password"
                                    type="password"
                                    onChange={(e) => setCPass(e.target.value)}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row md={{ span: 6 }}>
                            <Col md={6}>
                                {/* <Form.Select aria-label="Default select example">
                            <option style={{ color: 'rgba(101, 101, 101, 1)' }}>Pakistan</option>
                            <option style={{ color: 'rgba(101, 101, 101, 1)' }}>Austrilia</option>
                            <option style={{ color: 'rgba(101, 101, 101, 1)' }}>SriLanka</option>
                            <option style={{ color: 'rgba(101, 101, 101, 1)' }}>Pakistan</option>
                            <option style={{ color: 'rgba(101, 101, 101, 1)' }}>Pakistan</option>
                            <option style={{ color: 'rgba(101, 101, 101, 1)' }}>Pakistan</option>
                            <option style={{ color: 'rgba(101, 101, 101, 1)' }}>Pakistan</option>
                        </Form.Select> */}
                                <Form.Label style={{ color: 'rgba(101, 101, 101, 1)' }}> Country </Form.Label>
                                <input className="form-control" placeholder="Pakistan" disabled />
                            </Col>
                            {/* <Col md={ 6}>
                        <Form.Label style={{ color: 'rgba(101, 101, 101, 1)' }}> Country Of Origin </Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option style={{ color: 'rgba(101, 101, 101, 1)' }}>Select</option>
                        </Form.Select>
                        </Col> */}
                            <Col md={6}>
                                <Input
                                    label="LinkedIn profile Link"
                                    placeholder="URL"
                                    type="text"
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row md={{ offset: 3, span: 6 }}>
                            <Col md={12}>
                                <Form.Label style={{ color: 'rgba(101, 101, 101, 1)' }}> I am </Form.Label>
                                <Row md={{ span: 5, offset: 4 }}>
                                    <Col md={6} className="d-flex">
                                        <button id="investor" className="px-3 py-1 iam" onClick={() => { AddRemoveClass("investor", "startup"); setIAM("investor") }} >Investor</button>
                                        <span className="mx-3 mt-1" style={{ fontSize: "16px", color: "grey" }}>/</span>
                                        <button id="startup" className="px-3 py-1 iam" onClick={() => { AddRemoveClass("startup", "investor"); setIAM("entrepreneur") }} >Entrepreneur</button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <div className="row mt-2">
                            <div className="col-12 d-flex align-items-center">
                                <input type="radio" className="mx-2" />
                                <p className="d-block m-0" style={{ fontSize: '12px', fontWeight: '600' }}> By signing you agree to our <span style={{ borderBottom: '1px solid rgba(101, 101, 101, 1)' }}> Terms of use </span>  and <span style={{ borderBottom: '1px solid rgba(101, 101, 101, 1)' }}> privacy policy. </span>  </p>
                            </div>
                        </div>
                        {
                            IAM === "investor" && (
                                <Row md={{ offset: 3, span: 6 }}>
                                    <Col md={4} style={{ paddingTop: '20px' }}>
                                        {/* <Link to="/investor"> */}
                                        <Button variant="primary" style={{ borderRadius: '20px', padding: '5px 25px' }} onClick={createProfile}> Continue </Button>
                                        {/* </Link> */}
                                    </Col>
                                </Row>
                            )
                        }
                        {
                            IAM === "entrepreneur" && (
                                <Row md={{ offset: 3, span: 6 }}>
                                    <Col md={4} style={{ paddingTop: '20px' }}>
                                        {/* <Link to="/entrepreneur"> */}
                                        <Button variant="primary" style={{ borderRadius: '20px', padding: '5px 25px' }} onClick={createProfile}> Continue </Button>
                                        {/* </Link> */}
                                    </Col>
                                </Row>
                            )
                        }
                    </Col>
                </Row>
            </Container>

            <Footer />

        </>
    )
}

export default Profile