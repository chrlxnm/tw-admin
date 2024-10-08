import { Form, Image, Modal as ModalAntd, Upload, message } from "antd";
import React, { useEffect, useState } from "react";

import { ButtonPrimary } from "components/Button";
import { Input } from "components/Input";
import { PlusOutlined } from "@ant-design/icons";
import { fetchFileAsBlob } from "utils";
import styled from "styled-components";
import twService from "utils/services";

const HeroBannerModal = ({
  data,
  visible,
  onClose,
  setAlert,
  alert,
  type,
  refetch,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (type === "edit") {
      const imagePromise = fetchFileAsBlob(data?.images?.[0]?.url);
      Promise.all([imagePromise])
        .then(([imageFile]) => {
          // Update state with the fetched files
          setFileList([imageFile]);

          // Now set the form values after both files are fetched
          form.setFieldsValue({
            ...data,
            images: [imageFile],
          });
        })
        .catch((error) => {
          console.error("Error fetching files:", error);
          // Handle errors: clear file lists and optionally set form fields to empty
          setFileList([]);
          form.setFieldsValue({
            ...data,
            image: [],
          });
          // Optionally show an error message to the user
        });
    }
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // Clean up on unmount
    };
  }, [visible]);

  const onFinish = async (payload) => {
    setLoading(true);
    try {
      if (type === "edit") {
        await twService.put(`banners/room/${data.id}`, {...payload,type: 'hero'});
      } else {
        await twService.post(`banners/room`, payload);
      }
      closeModal();
      setAlert({
        ...alert,
        visible: true,
        message: "Pembuatan room banner berhasil",
      });
      refetch();
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

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const closeModal = () => {
    onClose();
    form.resetFields();
    setFileList([]);
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
      title={type === "detail" ? "Detail Room Banner" : "Form Room Banner"}
      open={visible}
      onOk={closeModal}
      onCancel={closeModal}
      centered
      maskClosable={false}
    >
      {contextHolder}
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
              label="Nama Banner"
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
                <Input placeholder="Tulis nama banner" />
              )}
            </Form.Item>
            <Form.Item
              label="Upload"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              {type === "detail" ? (
                <Image width={200} src={data?.images?.[0]?.url} />
              ) : (
                <Upload {...props} listType="picture-card">
                  {fileList?.length < 1 ? (
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
                  ) : null}
                </Upload>
              )}
            </Form.Item>
            <Form.Item>
              {type === "detail" ? (
                <ButtonPrimary onClick={onClose} className="w-full h-[42px]">
                  Close
                </ButtonPrimary>
              ) : (
                <ButtonPrimary
                  htmlType="submit"
                  className="w-full h-[42px]"
                  loading={loading}
                >
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

export default HeroBannerModal;

const Wrapper = styled.div`
  display: flex;
  gap: 36px;
  @media screen and (max-width: 768px) {
    display: grid;
  }
`;

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
    overflow: auto;
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
