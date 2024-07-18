import { Button, Modal } from "antd";

import React from "react";

const ConfirmationModal = ({ visible, title, content, onOk, onCancel }) => {
  return (
    <Modal
      title={title}
      centered
      open={visible}
      maskClosable={false}
      footer={[
        <Button key="back" onClick={onCancel}>
          Return
        </Button>,
        <Button key="submit" type="primary" onClick={onOk}>
          Submit
        </Button>
      ]}
      onCancel={onCancel}
    >
      <p>{content}</p>
    </Modal>
  );
};

export default ConfirmationModal;
