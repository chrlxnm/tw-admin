import { Form, Input as InputAntd, message } from "antd";
import React, { useState } from "react";

import { ButtonPrimary } from "components/Button";
import { LOGIN_URL } from "constant/paths";
import styled from "styled-components";
import twService from "utils/services";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPageSection = ({ toRegister }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const loginService = async (event) => {
    setLoading(true);
    let payload = {
      email: event.email,
      password: event.password,
      remember: true
    };
    try {
      const response = await twService.post(LOGIN_URL, payload); // Replace with your API endpoint
      onLogin(response?.data);
    } catch (error) {
      messageApi.open({
        type: "error",
        content:
          error?.response?.data?.message ||
          "Terjadi kesalahan di sistem, silakan hubungi admin.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onLogin = (event) => {
    login(event);
    navigate("/beranda", { replace: true });
  };


  return (
    <LoginWrapper>
      {contextHolder}
      <LoginContent>
        <div className="login-header">
          <LogoWrapper>
            <p className="font-bold text-[28px]">
              <span>Employe</span>
              <span className="text-[#EE2E24]">Corner</span>
            </p>
          </LogoWrapper>
          <Title>Login Wellness Portal</Title>
        </div>
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
          onFinish={loginService}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "",
              },
              {
                type: "email",
                message: "Format email tidak valid!",
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
            <InputPass placeholder="Masukkan password" />
          </Form.Item>
          <p className="text-[#246EE5] kp-text-[16px] cursor-pointer font-bold mb-[16px]">
            Lupa password?
          </p>
          <div className="grid gap-2">
            <ButtonPrimary
              htmlType="submit"
              className="w-full h-[42px]"
              loading={loading}
            >
              Lanjut
            </ButtonPrimary>
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

const InputPass = styled(InputAntd.Password)`
  height: 42px;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: #000000;
`;
