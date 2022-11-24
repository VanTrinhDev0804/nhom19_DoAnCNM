/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { Avatar, Modal } from "antd";
import { InfoCircleOutlined , DeleteOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {
  sendMessageRoute,
  recieveMessageRoute,
  recieveMessageGroup,
  deleteMessageRoute,
} from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket, isOpenInfo }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const success = async () => {
    Modal.success({
      content: "Đã xóa tin nhắn!",
    });
  
  };
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    if (currentChat.checkgroup) {
      const response = await axios.post(recieveMessageGroup, {
        from: data._id,
        to: currentChat.chat._id,
      });

      setMessages(response.data);
    } else {
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat.chat._id,
      });
    
      setMessages(response.data);
    }
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat.chat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat.chat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleshowInfo = (isOpen, currentChat) => {
    isOpenInfo(isOpen, currentChat);
  };

  const handleDeleteMessage =async (key)=>{
    if(key){
      const  response = await axios.post(`${deleteMessageRoute}/${key}`);
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      
      if(response.data.status){

        const response = await axios.post(recieveMessageGroup, {
          from: data._id,
          to: currentChat.chat._id,
        });

        
       
        setMessages(response.data);
        if (socket.current) {
          socket.current.on("delete-msg", (msg) => {
            setArrivalMessage({ fromSelf: false, message: msg });
          });
        }
        success()
      }else{
        console.log(response.data.status)

        
      }
      
    }
  }
  console.log(arrivalMessage)
  console.log(socket)
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="user-details_left">
            <div className="avatar">
              <Avatar
                size={38}
                icon={<img src={`${currentChat.chat.avatarImage}`} />}
              />
            </div>
            <div className="username">
              <h3>
                {currentChat.checkgroup
                  ? currentChat.chat.groupname
                  : currentChat.chat.username}
              </h3>
            </div>
          </div>

          <div className="infogroups">
            {currentChat.checkgroup ? (
              <InfoCircleOutlined
                type="icon-javascript"
             
                style={{ fontSize: "28px",  }}
                onClick={() => handleshowInfo(true, currentChat)}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="message-inf">
                  {message.fromSelf ? (
                    ""
                  ) : (
                    <p className="message-inf-name">
                      {message.nameSender ? message.nameSender : ""}
                    </p>
                  )}
                  <div className="content ">
                    <p>{message.message}</p>
                  </div>
                </div>
                <div className="messageActions">
                  {
                    message.fromSelf ?   <DeleteOutlined 
                    key={message._id}
                    type="icon-javascript"
                    className="icondelete"
                    style={{ fontSize: "20px" , color : 'white' , margin: 10 }}
                    onClick= {()=>handleDeleteMessage(message._id)}
                    /> : ""
                  }
                
                </div>

              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #263238;
    padding: 0 2rem;
    .user-details {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      .user-details_left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .avatar {
          margin: 20px;
          img {
            height: 3rem;
          }
        }
        .username {
          h3 {
            color: white;
          }
        }
      }

      .infogroups {
        color: white;
        justify-content: flex-end;
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .icondelete{
        display: none;
      }
      .message-inf {
        max-width: 40%;

        .message-inf-name {
          color: white;
        }

        .content {
          overflow-wrap: break-word;
          padding: 1rem;
          font-size: 1.1rem;
          border-radius: 1rem;
          color: #d1d1d1;
          @media screen and (min-width: 720px) and (max-width: 1080px) {
            max-width: 70%;
          }
        }
      
      
      }
       
      &:hover {
        cursor : pointer;
         .icondelete{
          display: block;
        }
      }
  
     
    }
   
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
