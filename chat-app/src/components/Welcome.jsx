import React from 'react'
import styled from "styled-components";
import Robot from "../assets/robot.gif";

function Welcome({ currentUser }) {
    return (
        <Container>
            <img src={Robot} alt="Robot" />
            <h1>
                欢迎，<span>{currentUser?.username}</span>
            </h1>
            <h3>请选择一位联系人开始聊天吧！</h3>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
export default Welcome