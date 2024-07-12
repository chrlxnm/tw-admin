import React, { Fragment, useEffect } from "react";

import ReactDOM from "react-dom";
import styled from "styled-components";

// import {Text} from "../Texts";

// import {ALERT_TYPE} from "./types";

// const getBorderColor = ({type}) => {
//     switch (type) {
//         case ALERT_TYPE.SUCCESS:
//             return '#77E4BD';
//         case ALERT_TYPE.ERROR:
//             return '#FFA39E';
//         case ALERT_TYPE.WARNING:
//             return '#ffe58f';
//         default:
//             return '#77E4BD';
//     }
// }

// const getBackgroundColor = ({type}) => {
//     switch (type) {
//         case ALERT_TYPE.SUCCESS:
//             return '#F1FFFA';
//         case ALERT_TYPE.ERROR:
//             return '#FFF1F0';
//         case ALERT_TYPE.WARNING:
//             return '#fffbe6';
//         default:
//             return '#F1FFFA';
//     }
// }

const AlertWrapper = styled.div`
  position: fixed;
  z-index: 999;
  width: 580px;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  background: #212121;

  border-radius: 8px;
  top: 120px;
  left: calc(50% - 255px);
  @media screen and (max-width: 768px) {
    width: 90%;
    left: 5%;
    top: 70px;
  }
`;

const AlertContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AlertMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Message = styled.p`
  font-size: 14px;
  color: #ffffff;
  font-weight: 500;
`;


const CloseButton = styled.p`
font-size: 14px;
font-weight: 700;
cursor: pointer;
color: #FF0000;
`;

const AlertCore = ({ message, type, onClose }) => {

  useEffect(() => {
    setTimeout(() => {
      onClose()
    }, 3000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <Fragment>
      <AlertWrapper type={type}>
        <AlertContentWrapper>
          <AlertMessageWrapper>
            <Message>
              {message}
            </Message>
          </AlertMessageWrapper>
          <CloseButton onClick={onClose}>
            Tutup
          </CloseButton>
        </AlertContentWrapper>
      </AlertWrapper>
    </Fragment>,
    document.getElementById("root")
  );
};

const TWAlert = ({ visible, message, type, onClose }) => {
  return visible? <AlertCore message={message} type={type} onClose={onClose}/> : null;
};

export default TWAlert;
