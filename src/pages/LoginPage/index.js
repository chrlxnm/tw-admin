import "./style.css";

import React, { useState } from "react";

import { Carousel as CarouselAntd } from "antd";
import LoginPageSection from "./LoginPage";
import RegisterSection from "./RegisterPage";
import styled from "styled-components";

const LoginPage = () => {
  const [section, setSection] = useState("login");

  return (
    <Wrapper>
      <LeftWrapper>
        <Carousel autoplay>
          <div className="grid w-[60%]">
            <BigTitle>Selamat datang, Rekans!</BigTitle>
            <Description>Tetap semangat dan selamat bekerja!</Description>
          </div>
          <BigTitle>Mari semangat!</BigTitle>
          <BigTitle>Bekerja</BigTitle>
        </Carousel>
      </LeftWrapper>
      <RightWrapper>
        {section === "login" ? (
          <LoginPageSection toRegister={() => setSection("register")} />
        ) : <RegisterSection toLogin={() => setSection("login")} />}
      </RightWrapper>
    </Wrapper>
  );
};

export default LoginPage;

const LeftWrapper = styled.div`
  width: 60vw;
  background-color: #3B3B3B;
  padding: 48px 48px 24px 24px;
  height: 100vh;
  .ant-carousel {
    margin-left: 4rem;
  }
  @media screen and (max-width: 768px) {
    width: 100vw;
    order: 2;
    padding: 12px;
    height: 300px;
    padding: 24px;
    .ant-carousel {
      margin-left: unset;
    }
  }
`;

const RightWrapper = styled.div`
  width: 40vw;
  background-color: white;
  padding: 24px;
  height: 100vh;
  @media screen and (max-width: 768px) {
    width: 100vw;
    order: 1;
    padding: 24px;
  }
`;

const BigTitle = styled.p`
  font-size: 64px;
  font-weight: 700;
  color: white;
  @media screen and (max-width: 768px) {
    font-size: 32px;
  }
`;
const Description = styled.p`
  font-size: 18px;
  color: white;
  width: 25%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  height: 100vh !important;
  display: flex;
  @media screen and (max-width: 768px) {
    display: grid;
  }
`;

const Carousel = styled(CarouselAntd)`
  > .slick-dots li button {
    width: 6px;
    height: 6px;
    border-radius: 100%;
  }
  > .slick-dots li.slick-active button {
    width: 7px;
    height: 7px;
    border-radius: 100%;
    background: white;
  }
  > .slick-dots {
    margin-top: 16px;
    justify-content: start;
  }
  > .slick-dots-bottom {
    bottom: unset;
  }
`;
