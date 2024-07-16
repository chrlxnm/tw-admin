import { BadgePrimary, BadgeSecondary } from "components/Badge";
import { Button, Popover, Space, Table, message } from "antd";
import { ButtonApprove, ButtonReject } from "components/Button";
import React, { Fragment, useState } from "react";

import { ReactComponent as CheckIcon } from "assets/icons/check-icon.svg";
import Chip from "components/Chip/Chip";
import ConfirmationModal from "components/ConfirmationModal";
import { ReactComponent as CrossIcon } from "assets/icons/cross-icon.svg";
import { DownOutlined } from "@ant-design/icons";
import { Input } from "components/Input";
import RoomModal from "components/RoomModal";
import { ReactComponent as SearchIcon } from "assets/icons/search.svg";
import TWAlert from "components/Alert";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Room = () => {
  const [modalProps, setModalProps] = useState({
    visible: false,
    data: undefined,
  });
  const [confirmModal, setConfirmModal] = useState({
    visible: false,
    title: "",
    content: "",
    onOk: null,
  });

  const openReject = () => {
    setConfirmModal({
      ...confirmModal,
      visible: true,
      title: 'Konfirmasi',
      content: 'Apakah kamu yakin reject banner ini?',
      onOk: () => {
        closeModalConfirm();
        message.open("TEST");
      }
    })
  }

  const openApprove = () => {
    setConfirmModal({
      ...confirmModal,
      visible: true,
      title: 'Konfirmasi',
      content: 'Apakah kamu yakin approve banner ini?',
      onOk: () => {
        closeModalConfirm();
        message.open("TEST");
      }
    })
  }

  const closeModalConfirm = () => {
    setConfirmModal({
      ...confirmModal,
      visible: false,
    });
  };

  const openModal = (data) => {
    setModalProps({
      ...modalProps,
      visible: true,
      data: data,
    });
  };

  const [alert, setAlert] = useState({
    message: "",
    visible: false,
  });

  const [status, setStatus] = useState("all");
  const [isAdmin, setIsAdmin] = useState(true);

  const navigate = useNavigate();

  const goToPage = (page) => {
    navigate(page, { replace: true });
  };

  const handleMenuClick = (event) => {
    switch (event) {
      case "detail":
        goToPage("detail/1");
        return;
      case "participant":
        goToPage("participant/1");
        return;
      case "status":
        message.info("Click on menu item.");
        return;
      case "delete":
        message.info("Click on menu item.");
        return;
      default:
        return;
    }
  };

  const contentAction = (record) => {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{ cursor: "pointer", marginTop: "2px", marginBottom: "2px" }}
          onClick={() => handleMenuClick("detail")}
        >
          <span style={{ marginLeft: "0.5rem" }}>Lihat Detail</span>
        </div>
        <div
          style={{ cursor: "pointer", marginTop: "2px", marginBottom: "2px" }}
          onClick={() => handleMenuClick("participant")}
        >
          <span style={{ marginLeft: "0.5rem" }}>Lihat Peserta</span>
        </div>
        <div
          style={{ cursor: "pointer", marginTop: "2px", marginBottom: "2px" }}
          onClick={() => handleMenuClick("status")}
        >
          <span style={{ marginLeft: "0.5rem" }}>Inactive</span>
        </div>

        <div
          style={{ cursor: "pointer", marginTop: "2px", marginBottom: "2px" }}
          onClick={() => handleMenuClick("delete")}
        >
          <span style={{ marginLeft: "0.5rem" }}>Hapus</span>
        </div>
      </div>
    );
  };

  const columns = [
    {
      title: "Nama Ruangan",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Kuota Peserta",
      dataIndex: "quota",
      key: "quota",
    },
    {
      title: "Kondisi",
      dataIndex: "condition",
      key: "condition",
      render: (text) =>
        text ? <BadgeSecondary color={text}>{text}</BadgeSecondary> : "-",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) =>
        text ? <BadgePrimary color={text}>{text}</BadgePrimary> : "-",
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) =>
        isAdmin ? (
          <Space>
            <ButtonReject onClick={openReject}>
              <Space>
                <CrossIcon />
                Reject
              </Space>
            </ButtonReject>
            <ButtonApprove onClick={openApprove}>
              <Space>
                <CheckIcon />
                Approve
              </Space>
            </ButtonApprove>
          </Space>
        ) : (
          <Popover
            content={contentAction(record)}
            trigger="click"
            placement="bottomRight"
          >
            <Button>
              <Space>
                Atur
                <DownOutlined />
              </Space>
            </Button>
          </Popover>
        ),
    },
  ];

  const data = [
    {
      id: "1",
      name: "Ruangan Band",
      quota: 32,
      condition: "",
      status: "Submitted",
    },
    {
      id: "2",
      name: "Ruang Karaoke",
      quota: 10,
      condition: "",
      status: "Approved",
    },
    {
      id: "3",
      name: "Area Panggung",
      quota: 25,
      condition: "",
      status: "Canceled",
    },
  ];
  return (
    <Fragment>
      <TWAlert
        visible={alert?.visible}
        message={alert?.message}
        onClose={() =>
          setAlert({
            ...alert,
            visible: false,
          })
        }
      />
      <ConfirmationModal
        visible={confirmModal.visible}
        title={confirmModal.title}
        content={confirmModal.content}
        onOk={confirmModal.onOk}
        onCancel={closeModalConfirm}
      />
      <RoomModal
        alert={alert}
        setAlert={setAlert}
        visible={modalProps?.visible}
        data={modalProps?.data}
        onClose={() => setModalProps({ ...modalProps, visible: false })}
      />
      <HeaderWrapper>
        <Title>Sport Class</Title>
        <AddButton onClick={openModal}>+ Tambah Baru</AddButton>
      </HeaderWrapper>
      <SearchWrapper>
        <Input
          className="my-[16px] w-[40%]"
          size="large"
          placeholder="Cari sport class disini . . ."
          prefix={<SearchIcon />}
        />
        <ChipWrapper>
          <Chip
            label={"Semua"}
            active={status === "all"}
            onClick={() => setStatus("all")}
          />
          <Chip
            label={"Submitted"}
            active={status === "submitted"}
            onClick={() => setStatus("submitted")}
          />
          <Chip
            label={"Approved"}
            active={status === "approved"}
            onClick={() => setStatus("approved")}
          />
          <Chip
            label={"Cancelled"}
            active={status === "cancelled"}
            onClick={() => setStatus("cancelled")}
          />
        </ChipWrapper>
      </SearchWrapper>
      <Table scroll={{ x: true }} columns={columns} dataSource={data} />
    </Fragment>
  );
};

export default Room;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const AddButton = styled.p`
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: #246ee5;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ChipWrapper = styled.div`
  max-width: 100%;
  overflow: auto;
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  text-wrap: nowrap;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
