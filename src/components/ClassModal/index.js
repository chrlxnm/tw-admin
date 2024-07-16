import {
  DatePicker,
  Form,
  Modal as ModalAntd,
  Select as SelectAntd,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";

import AlertBanner from "./Alert";
import { ButtonPrimary } from "components/Button";
import { Input } from "components/Input";
import { PlusOutlined } from "@ant-design/icons";
import { ReactComponent as Users } from "assets/icons/users.svg";
import styled from "styled-components";

const ClassModal = ({ data, visible, onClose, setAlert, alert }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // Clean up on unmount
    };
  }, [visible]);

  const onFinish = (e) => {
    console.log("HEEHEH", e);
    // closeModal();
    // setAlert({
    //   ...alert,
    //   visible: true,
    //   message: "Pendaftaran ruangan billiard berhasil",
    // });
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const closeModal = () => {
    onClose();
    form.resetFields();
  };

  const [fileList, setFileList] = useState([]);
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <Modal
      title="Form Sport Class"
      open={visible}
      onOk={closeModal}
      onCancel={closeModal}
    >
      <Wrapper>
        <RightSide>
          <Form
            form={form}
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
            requiredMark={false}
            onFinish={onFinish}
          >
            <Form.Item
              label="Nama Sport Class"
              name="name"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input placeholder="Tulis nama sport class" />
            </Form.Item>
            <Form.Item
              label="Tanggal Penggunaan"
              name="date"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <DatePicker
                placeholder="Pilih tanggal pemesanan"
                size="large"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              label="Waktu Sport Class"
              name="time"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                size="large"
                placeholder="Pilih waktu mulai"
                options={[
                  { value: "11:00", label: "11:00" },
                  { value: "12:00", label: "12:00" },
                  { value: "13:00", label: "13:00" },
                  { value: "14:00", label: "14:00", disabled: true },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Kuota"
              name="quota"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input
                placeholder="Masukkan jumlah peserta disini"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </Form.Item>
            <Form.Item
              label="Upload"
              name="upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload {...props} listType="picture-card">
                <button
                  style={{
                    border: 0,
                    background: "none",
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <ButtonPrimary htmlType="submit" className="w-full h-[42px]">
                Kirim
              </ButtonPrimary>
            </Form.Item>
          </Form>
        </RightSide>
      </Wrapper>
    </Modal>
  );
};

export default ClassModal;

const Wrapper = styled.div`
  display: flex;
  gap: 36px;
  @media screen and (max-width: 768px) {
    display: grid;
  }
`;
const BadgeWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Select = styled(SelectAntd)``;

const GreyBadge = styled.div`
  font-size: 14px;
  color: #535353;
  background: #f2f2f2;
  padding: 8px;
  border-radius: 4px;
  height: fit-content;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 8px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const LeftSide = styled.div`
  display: grid;
  width: 100%;
  grid-auto-rows: min-content;
`;

const RightSide = styled.div`
  display: grid;
  width: 100%;
  overflow: auto;
  height: 80vh;

  @media screen and (max-width: 768px) {
    height: 100%;
  }
`;

const Image = styled.img`
  border-radius: 20px;
  width: 100%;
  aspect-ratio: 9 / 5;
  height: auto;
  object-fit: cover;
  margin-bottom: 16px;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const Modal = styled(ModalAntd)`
  .ant-modal-footer {
    display: none !important;
  }
  .ant-modal-body {
    max-height: calc(90vh - 72px);
  }

  &.ant-modal-wrap {
    overflow: unset !important;
  }

  .ant-modal-content {
    width: 60vw;
    max-height: 90vh;
  }
  &.ant-modal {
    width: 60vw !important;
    top: 5vh;
    max-height: 90vh;
  }
  .ant-modal-header {
    margin-bottom: 16px;
  }

  @media screen and (max-width: 768px) {
    &.ant-modal-wrap {
      overflow: unset !important;
    }
    &.ant-modal {
      top: 0;
      margin: 0;
      padding: 0;
      width: 100vw !important;
      max-width: unset;
      max-height: 100vh;
    }
    .ant-modal-content {
      height: 100vh;
      max-height: 100vh;
      width: 100vw;
    }
    .ant-modal-body {
      overflow: auto;
      max-height: calc(100vh - 72px);
    }
  }
`;
