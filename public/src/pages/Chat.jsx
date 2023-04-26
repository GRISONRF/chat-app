import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUsersRoute } from "../utils/APIRoutes";
// import { ChatContainer } from "../components/ChatContainer";
// import Contacts from "../components/Contacts";
// import Welcome from "../components/Welcome";
// import { allUserRoute, host } from "../utils/APIRoutes";
// import {io} from "socket.io-client";



function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  useEffect(async () => {
    if(!localStorage.getItem('chat-app-user')){
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
    }
  },[]);

  useEffect(async()=> {
    if(currentUser) {
      if(currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  }, [])
  return (
    <Container>
      <div className="container"></div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #131324;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: white;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-column: 35% 65%;
    }
  }
`;
export default Chat;