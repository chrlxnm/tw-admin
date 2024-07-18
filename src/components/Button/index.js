import { Button } from "antd";
import styled from "styled-components";

export const ButtonPrimary = styled(Button)`
  height: 48px;
  border-radius: 8px;
  border: unset;
  background-color: #246EE5;
  &.ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover {
    border-color: #246EE5;
    color: #fd4646;
    background-color: #246EE5;
  }
  &.ant-btn > span {
    font-size: 16px;
    font-weight: 500;
    color: white;
  }
`;
export const ButtonSecondary = styled(Button)`
  height: 48px;
  border-radius: 8px;
  border: 2px solid #246EE5;
  background-color: white;
  &.ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover {
    border-color: #246EE5;
    color: #246EE5;
    background-color: #fbf7f7;
  }
  &.ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover > span {
    color: #246EE5;
  }
  &.ant-btn > span {
    font-weight: 700;
    color: #246EE5;
    font-size: 16px;
  }
  @media screen and (max-width: 768px) {
    height: 36px;
    span {
      font-size: 12px;
    }
  }
`;

export const ButtonApprove = styled.div`
  padding: 4px 8px;
  border-radius: 8px;
  display: flex;
  color: #00aa5b;
  border: 1px solid #d3d3d3;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background: white;
`;

export const ButtonReject = styled.div`
  padding: 4px 8px;
  border-radius: 8px;
  display: flex;
  color: #fb2121;
  border: 1px solid #d3d3d3;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background: white;
`;
