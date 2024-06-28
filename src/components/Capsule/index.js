import React from "react";
import styled from "styled-components";

const Capsule = ({ section }) => {
  return (
    <Wrapper>
      <Item className="left" active={section === "email"}>
        <Circle active={section === "email"}>1</Circle>
        <Title active={section === "email"}>Email</Title>
      </Item>
      <Item className="right" active={section === "data"}>
        <Circle active={section === "data"}>2</Circle>
        <Title active={section === "data"}>Data Diri</Title>
      </Item>
    </Wrapper>
  );
};

export default Capsule;

const Wrapper = styled.div`
  display: flex;
  gap: 2px;
  .right {
    border-radius: 0 100px 100px 0;
  }
  .left {
    border-radius: 100px 0 0 100px;
  }
  margin-bottom: 16px;
`;

const Item = styled.div`
  background: ${(props) => (props.active ? "#FF0000" : "#FCE9E9")};
  display: flex;
  padding: 8px 12px 8px 8px;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 36px;
  justify-content: center;
`;

const Circle = styled.div`
  border-radius: 100%;
  padding: 2px;
  height: 20px;
  width: 20px;
  display: flex;
  background: ${(props) => (props.active ? "#ffffff80" : "#909090")};
  align-items: center;
  font-size: 10px;
  font-weight: 700;
  justify-content: center;
  color: white;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => (props.active ? "white" : "#646464")};
`;
