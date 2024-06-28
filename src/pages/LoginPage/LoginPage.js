import { ButtonPrimary, ButtonSecondary } from "components/Button";
import { Form, Input as InputAntd } from "antd";
import React, { useState } from "react";

import styled from "styled-components";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPageSection = ({ toRegister }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isDisabled, setIsDisabled] = useState(true);

  const onLogin = (event) => {
    login(event?.username);
    navigate("/beranda", { replace: true });
  };

  const onValuesChange = () => {
    const hasErrors = form
      .getFieldsError()
      .some(({ errors }) => errors.length > 0);
    setIsDisabled(hasErrors);
  };
  
  return (
    <LoginWrapper>
      <LoginContent>
        <div className="login-header">
          <LogoWrapper>
            <Title>Employe</Title>
            <span className="title-font title-red">Corner</span>
          </LogoWrapper>
          <Title>Login Wellness Portal</Title>
        </div>
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
          onFinish={onLogin}
          onFieldsChange={onValuesChange}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input placeholder="Masukkan email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input placeholder="Masukkan password" />
          </Form.Item>
          <p className="text-[#2697A5] kp-text-[16px] cursor-pointer font-bold mb-[16px]">Lupa password?</p>
          <div className="grid gap-2">
            <ButtonPrimary
              htmlType="submit"
              className="w-full h-[42px]"
              disabled={isDisabled}
            >
              Lanjut
            </ButtonPrimary>
            <ButtonSecondary
              htmlType="submit"
              className="w-full h-[42px]"
            >
              Pakai Nomor HP
            </ButtonSecondary>
          </div>
        </Form>
      </LoginContent>
    </LoginWrapper>
  );
};

export default LoginPageSection;

const LogoWrapper = styled.div`
  display: flex;
`;

const LoginWrapper = styled.div`
  justify-content: center;
  display: flex;
  height: 90vh;
  align-items: center;
  @media screen and (max-width: 768px) {
    align-items: start;
    padding-top: 4rem;
  }
`;
const LoginContent = styled.div`
  width: 80%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Input = styled(InputAntd)`
  height: 42px;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: #000000;
`;
