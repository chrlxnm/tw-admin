import {
  DatePicker,
  Form,
  Image,
  Modal as ModalAntd,
  Select as SelectAntd,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";

import { ButtonPrimary } from "components/Button";
import { Input } from "components/Input";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

const ClassModal = ({ data, visible, onClose, setAlert, alert, type }) => {
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
    closeModal();
    setAlert({
      ...alert,
      visible: true,
      message: "Pendaftaran class berhasil",
    });
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
      title={type === "detail" ? "Detail Sport Class" : "Form Sport Class"}
      open={visible}
      onOk={closeModal}
      onCancel={closeModal}
      centered
      maskClosable={false}
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
              {type === "detail" ? (
                <p>{data?.name || "-"}</p>
              ) : (
                <Input placeholder="Tulis nama sport class" />
              )}
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
              {type === "detail" ? (
                <p>{data?.date || "-"}</p>
              ) : (
                <DatePicker
                  placeholder="Pilih tanggal pemesanan"
                  size="large"
                  style={{ width: "100%" }}
                />
              )}
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
              {type === "detail" ? (
                <p>{data?.time || "-"}</p>
              ) : (
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
              )}
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
              {type === "detail" ? (
                <p>{data?.quota || "-"}</p>
              ) : (
                <Input
                  placeholder="Masukkan jumlah peserta disini"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              )}
            </Form.Item>
            <Form.Item
              label="Upload"
              name="upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              {type === "detail" ? (
                <Image width={200} src="https://picsum.photos/200/300" />
              ) : (
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
              )}
            </Form.Item>
            <Form.Item>
              {type === "detail" ? (
                <ButtonPrimary onClick={onClose} className="w-full h-[42px]">
                  Close
                </ButtonPrimary>
              ) : (
                <ButtonPrimary htmlType="submit" className="w-full h-[42px]">
                  Kirim
                </ButtonPrimary>
              )}
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

const Select = styled(SelectAntd)``;

const RightSide = styled.div`
  display: grid;
  width: 100%;
  overflow: auto;
  height: auto;

  @media screen and (max-width: 768px) {
    height: 100%;
  }
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
