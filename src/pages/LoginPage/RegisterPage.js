import { Form, Input as InputAntd } from "antd";
import React, { useState } from "react";

import { ButtonPrimary } from "components/Button";
import Capsule from "components/Capsule";
import styled from "styled-components";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterSection = ({ toLogin }) => {
  const [section, setSection] = useState("email");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isDisabled, setIsDisabled] = useState(true);

  const onNext = (event) => {
    setSection("data");
  };
  const onRegister = (event) => {
    login(event?.name);
    navigate("/beranda", { replace: true });
  };

  const onValuesChange = () => {
    const hasErrors = form
      .getFieldsError()
      .some(({ errors }) => errors.length > 0);
    setIsDisabled(hasErrors);
  };

  return (
    <RegisterWrapper>
      <RegisterContent>
        <div className="login-header">
          <LogoWrapper>
            <Title>Employe</Title>
            <Title red>Corner</Title>
          </LogoWrapper>
          <Title>Register Wellness Portal</Title>
        </div>
        <Capsule section={section} />
        {section === "email" ? (
          <Form
            form={form}
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
            requiredMark={false}
            onFinish={onNext}
            onFieldsChange={onValuesChange}
          >
            <Form.Item
              name="email"
              label="Email"
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
            <Form.Item>
              <ButtonPrimary
                htmlType="submit"
                className="w-full h-[42px]"
                disabled={isDisabled}
              >
                Lanjut
              </ButtonPrimary>
            </Form.Item>
          </Form>
        ) : (
          <Form
            form={form}
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
            requiredMark={false}
            onFinish={onRegister}
          >
            <Form.Item
              name="name"
              label="Nama Karyawan"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input placeholder="Masukkan nama karyawan" />
            </Form.Item>
            <Form.Item
              name="nik"
              label="NIK"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input placeholder="Masukkan nik" />
            </Form.Item>
            <Form.Item
              name="unit"
              label="Unit/Divisi"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input placeholder="Masukkan unit/divisi" />
            </Form.Item>
            <Form.Item>
              <ButtonPrimary htmlType="submit" className="w-full h-[42px]">
                Lanjut
              </ButtonPrimary>
            </Form.Item>
          </Form>
        )}
        <div className="flex gap-[4px]">
          <p className="text-[#1E1E1E] text-[16px]">Sudah memiliki akun?</p>
          <p
            className="text-[#FF0000] text-[16px] font-semibold cursor-pointer"
            onClick={toLogin}
          >
            Login disini
          </p>
        </div>
      </RegisterContent>
    </RegisterWrapper>
  );
};

export default RegisterSection;
const LogoWrapper = styled.div`
  display: flex;
`;

const RegisterWrapper = styled.div`
  justify-content: center;
  display: flex;
  height: 90vh;
  align-items: center;
  @media screen and (max-width: 768px) {
    align-items: start;
    padding-top: 4rem;
  }
`;
const RegisterContent = styled.div`
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
  color: ${(props) => (props.red ? "#FF0000" : "#000000")};
`;
