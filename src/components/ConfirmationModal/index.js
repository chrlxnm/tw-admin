import { Modal } from "antd";
import React from "react";

const ConfirmationModal = ({ visible, title, content, onOK, onCancel }) => {
  return (
    <Modal
      title={title}
      centered
      open={visible}
      onOk={onOK}
      onCancel={onCancel}
    >
      <p>{content}</p>
    </Modal>
  );
};

export default ConfirmationModal;
