import React from "react";
import styled from "styled-components";

const Chip = ({ active, label, onClick }) => {
  return (
    <Wrapper active={active} onClick={onClick}>
      <p>{label}</p>
    </Wrapper>
  );
};

export default Chip;

const Wrapper = styled.div`
  cursor: pointer;
  padding: 10px 16px 10px 16px;
  border: ${(props) =>
    props.active ? "2px solid #246EE5" : "2px solid #535353"};
  background: ${(props) => (props.active ? "#E9F1FC" : "#FFFFFF")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  font-size: 14px;
  color: ${(props) => (props.active ? "#246EE5" : " #535353")};
  width: fit-content;
  height: fit-content;
  border-radius: 100px;
  display: flex;
  align-items: center;
`;
