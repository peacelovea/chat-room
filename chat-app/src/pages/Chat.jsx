import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import styled from "styled-components";
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';

function Chat() {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login")
    } else {
      setCurrentUser(JSON.parse(
        localStorage.getItem("chat-app-user")
      ))
    }
  }, [])

  useEffect(() => {
    const loadData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };

    loadData();
  }, [currentUser])

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts changeChat={handleChatChange} contacts={contacts} currentUser={currentUser} />
        {
          currentChat === undefined ?
            <Welcome currentUser={currentUser} />
            :
            <ChatContainer currentChat={currentChat} />
        }
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat
