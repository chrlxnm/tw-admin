import { Button } from "antd";
import styled from "styled-components";

export const ButtonPrimary = styled(Button)`
  height: 48px;
  border-radius: 8px;
  border: unset;
  background-color: #2697A5;
  &.ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover {
    border-color: #2697A5;
    color: #fd4646;
    background-color: #2697A5;
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
  border: 2px solid #2697A5;
  background-color: white;
  &.ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover {
    border-color: #2697A5;
    color: #2697A5;
    background-color: #fbf7f7;
  }
  &.ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover > span {
    color: #2697A5;
  }
  &.ant-btn > span {
    font-weight: 700;
    color: #2697A5;
    font-size: 16px;
  }
  @media screen and (max-width: 768px) {
    height: 36px;
    span {
      font-size: 12px;
    }
  }
`;
