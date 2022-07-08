import React, { useState } from "react";
import Footer from "../Footer";
import InvestorNavbar from "../InvestorNavbar";
import './EditProfile.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Signin, UpdateUser } from "../API/API";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'



export default function EditProfile() {
    const navigation = useNavigate()
    const flag = localStorage.getItem("flag")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [bio, setBio] = useState("")
    const [projects, setProjects] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [linkedin, setLinkedin] = useState("")
    const [mobile, setMobile] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [designation, setDesignation] = useState("")
    const username = localStorage.getItem("username")
    const pass = localStorage.getItem("pass")
    const [user, setUser] = useState([])
    const [image, setImage] = useState("")

    const successMsg = (msg) => {
        if(newPassword===confirmPassword){
            const data = {
                username: username,
                first_name: fname,
                last_name: lname,
                phone: mobile,
                password: newPassword,
                linkedin_link: linkedin,
                projects: projects,
                bio: bio,
                city: city,
                designation: designation,
                photo: image,
            }
        localStorage.setItem("pass", newPassword)
        console.log(data)
        const update = UpdateUser(data)
        update.then((data) => {
            if (data?.message){
                toast.success(data.message);
                navigation(`/${user.role}`)
            }
            else if(data.error){
                toast.error(data.error);
            }})
          .catch((error) => {
            return error;
          });
        }
        else{
            toast.error("Password and confirm password are not same");
        }
    }

    const errorMsg = (msg) => toast.alert(msg);
    
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
    

    React.useEffect(() => {
        const body = {
            username: localStorage.getItem("username"),
            password: localStorage.getItem("pass")
        }
        const response = Signin(body);
        response
          .then((data) => {
            console.log(data)
            if(data?.user){
            setUser(data.user)
            setFname(data.user.first_name)
            setLname(data.user.last_name)
            setBio(data.user.bio)
            setProjects(data.user.projects)
            setCity(data.user.city)
            setLinkedin(data.user.linkedin_link)
            setMobile(data.user.phone)
            setNewPassword(data.user.password)
            setDesignation(data.user.designation)
            setConfirmPassword(data.user.password)
            }
            else{
                toast.alert("There is something wrong, please try again with corect credentials")
            }

          })
          .catch((error) => {
            return error;
          });
        }, [])
    return (
        <>
        {flag && <div>
            <InvestorNavbar />
            <div className="container my-3">
                <h3 className="text-center">Edit Personal Information</h3>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                            <label className="profile_details_text">First Name:</label>
                            <input placeholder="First Name" type="text" name="fname" className="form-control" defaultValue={user.first_name} onChange={e => setFname(e.target.value)} required />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                            <label className="profile_details_text">Last Name: </label>
                            <input placeholder="Last Name" type="text" name="lname" className="form-control" defaultValue={user.last_name} onChange={e => setLname(e.target.value)} required />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                            <label className="profile_details_text">Bio</label>
                            <textarea style={{ resize: "none", minHeight: "150px" }} placeholder="Description (About Yourself)" type="text" name="projects" defaultValue={user.bio} className="form-control" onChange={e => setBio(e.target.value)} required />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                            <label className="profile_details_text">Projects</label>
                            <textarea style={{ resize: "none", minHeight: "150px" }} placeholder="Description (about projects you have done)" type="text" name="projects" defaultValue={user.projects} className="form-control" onChange={e => setProjects(e.target.value)} required />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                            <label className="profile_details_text">Designation:</label>
                            <input placeholder="Designation" type="text" name="designation" className="form-control" defaultValue={user.designation} onChange={e => setDesignation(e.target.value)}  required />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                            <label className="profile_details_text">Country:</label>
                            <input placeholder="Pakistan" type="name" name="email" className="form-control" disabled />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                            <label className="profile_details_text">Username:</label>
                            <input placeholder="Username" type="name" name="email" className="form-control" defaultValue={user.username} disabled />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                            <label className="profile_details_text">Email:</label>
                            <input placeholder="Email" type="name" name="email" className="form-control" defaultValue={user.email} disabled />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                            <label className="profile_details_text">City:</label>
                            <input placeholder="Lahore" type="name" name="email" defaultValue={user.city} className="form-control" onChange={e => setCity(e.target.value)} required />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                            <label className="profile_details_text">Linkedin Link:</label>
                            <input placeholder="linkedin" type="text" name="linkedin-link" className="form-control" defaultValue={user.linkedin_link} onChange={e => setLinkedin(e.target.value)} required />

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                            <label className="profile_details_text">Mobile Number:</label>
                            <input type="text" pattern="\d*" maxlength="11" placeholder="+92XXXXXXXXXX" name="phone" className="form-control" defaultValue={user.phone} onChange={e => setMobile(e.target.value)} required />

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                            <label className="profile_details_text">New Password</label>
                            <input placeholder="New Password" type="password" name="phone" className="form-control" defaultValue={user.password} onChange={e => setNewPassword(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label className="profile_details_text">Confirm Password</label>
                            <input placeholder="Confirm Password" type="password" name="phone" className="form-control" defaultValue={user.password} onChange={e => setConfirmPassword(e.target.value)} required />

                        </div>
                    </div>
                </div>
                
                {/* <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                            <label className="profile_details_text">Nationality:</label>
                            <input type="text" name="nationality" className="form-control"  required />
                        </div>
                    </div>
                </div> */}

                <div className="row my-2">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 submit d-flex align-items-center justify-content-between">
                        <div className="form-group">
                            <input onClick={() => successMsg("Updated Successfully")} type="submit" className="btn btn-primary" value="Submit" />
                        </div>
                        <div style={{ width: "200px", overflow: "hidden" }}>
                            <input type="file" class="custom-file-input" onChange={(e)=>{uploadImage(e.target.files)}}/>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <Footer />
            </div>}
            {!flag && <div>You are not authenticated</div>}
        </>
    )
}