import {ReactComponent as Info} from "assets/icons/Information.svg";
import React from "react";
import styled from "styled-components";

const AlertBanner = () => {
  return (
    <Wrapper>
      <Info style={{width: 28, height: 28}} />
      <TitleWrapper>
        <Title>Booking lebih dari 1 jam?</Title>
        <Description>
          Ya, Anda dapat menggunakan ruangan lebih dari 1 jam. Lakukan pemilihan
          slot jam sesuai dengan yang Anda inginkan.
        </Description>
      </TitleWrapper>
    </Wrapper>
  );
};

export default AlertBanner;

const Wrapper = styled.div`
  background: #f2f8fe;
  border-radius: 6px;
  padding: 12px 8px;
  border-left: 4px solid #38a6f4;
  display: flex;
  gap: 8px;
`;

const TitleWrapper = styled.div`
  display: block;
  gap: 8px;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 14px;
`;

const Description = styled.p`
  font-weight: 500;
  font-size: 12px;
`;
