import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ChatFeed } from "react-chat-ui";
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { GetMessages, PostReply, GetReply } from "../API/API";


const Chat = () => {
    const navigation = useNavigate()
    const [msgData, setMsgData] = useState([])
    const [reply, setReply] = useState("")

    React.useEffect(() => {
      const id = window.location.pathname.split("/").pop()
      const body = {
          username: localStorage.getItem("username"),
          password: localStorage.getItem("pass")
      }
      const response = GetReply(id);
      response
        .then((data) => {
          setMsgData(data.result)
          console.log(data.result)
        })
        .catch((error) => {
          return error;
        });
    }, []);

    const getReplies = (data) =>{
      if(data){
      var result = data.map(function(e) {
        return {id: e.senders_id, message: e.content}
      })
      return result
    }}

    const handleSend = () =>{
      const data = {
        sender: localStorage.getItem("username"),
        post: msgData.post,
        content: reply,
        id: window.location.pathname.split("/").pop(),
        isAuthenticated: true
      }
      const response = PostReply(data);
      response
        .then((data) => {
          console.log(data)
          setReply("")
          let id =  window.location.pathname.split("/").pop()
          const response = GetReply(id);
          response
            .then((data) => {
              setMsgData(data.result)
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
    const firstmessage = msgData ? [{id: msgData.senders_id, message: msgData.content}]: []
    const messages = msgData.replies ? firstmessage.concat(msgData.replies) : []
    return (
    <Row md={12}>
        <Row md={12}>
            <div style={{ margin:"30px", overflow: "hidden", position: "fixed", top: "0" }}>
            <Col ms={4}>
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
            </Col>
            <Col md={8}>
             <p style={{ color: 'rgba(137, 137, 137, 1)', fontSize: "28px", fontWeight:"bold", color:"black" }}>User:{msgData ? msgData.sender : ""}</p>
            </Col>
            </div>
        </Row>
         <Row md={10}>   
            <Col md={2}>
        </Col>
        {msgData &&
          <Col md={8}>
              <Row style={{ margin: "20% 5%" }}>
                  <ChatFeed
                      messages={messages} // Array: list of message objects
                      showSenderName={true} // show the name of the user who sent the message
                      bubblesCentered={true} //Boolean should the bubbles be centered in the feed?
                      bubbleStyles={{
                      text: {
                          fontSize: 20,
                          color: "white"
                      },
                      chatbubble: {
                          borderRadius: 40,
                          padding: 20,
                          backgroundColor: "black"
                      }
                      }}
                  />
              </Row>
          <Row>   
              <div className="chat-input" style={{marginBottom: "50px" , overflow: "hidden", position: "fixed", bottom: "0", width: "70%", marginRight: "50%", margin: "-30px", height: "120px", background: "black"}}>
                  <div className="input-group my-3">
                      <input type="text" class="form-control py-3" placeholder="Send message to Creator" aria-label="Send message to Creator" aria-describedby="button-addon2" value={reply} onChange={(e)=>setReply(e.target.value)}/>
                      <button class="btn btn-primary px-5" type="button" id="button-addon2" onClick={handleSend}>Send</button>
                  </div>
              </div>
          </Row>
        </Col>
      }
      </Row>
    </Row>
    );
}

export default Chat;
