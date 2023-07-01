import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { allUsersRoute } from "../utils/APIRoutes";

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

  useEffect(()=>{
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
  },[currentUser])

  return (
    <div>Chat</div>
  )
}

export default Chat
