import { BadgePrimary, BadgeSecondary } from "components/Badge";
import { Button, Popover, Space, Table } from "antd";
import React, { Fragment, useState } from "react";

import { ReactComponent as CheckIcon } from "assets/icons/check-icon.svg";
import Chip from "components/Chip/Chip";
import ConfirmationModal from "components/ConfirmationModal";
import { ReactComponent as CrossIcon } from "assets/icons/cross-icon.svg";
import { DownOutlined } from "@ant-design/icons";
import { Input } from "components/Input";
import RoomBannerModal from "components/RoomBannerModal";
import { ReactComponent as SearchIcon } from "assets/icons/search.svg";
import TWAlert from "components/Alert";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RoomBanner = () => {
  const [status, setStatus] = useState("all");
  // eslint-disable-next-line no-unused-vars
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalProps, setModalProps] = useState({
    visible: false,
    type: "add",
    data: undefined,
  });

  const openDetailModal = (data) => {
    setModalProps({
      ...modalProps,
      visible: true,
      type: "detail",
      data: data,
    });
  };

  const openModal = (data) => {
    setModalProps({
      ...modalProps,
      visible: true,
      data: data,
      type: 'add'
    });
  };

  const [confirmModal, setConfirmModal] = useState({
    visible: false,
    title: "",
    content: "",
    onOk: () => {},
  });

  const openReject = () => {
    setConfirmModal({
      ...confirmModal,
      visible: true,
      title: "Konfirmasi",
      content: "Apakah kamu yakin reject banner ini?",
      onOk: () => {
        closeModalConfirm();
        setAlert({
          ...alert,
          visible: true,
          message: "Berhasil melakukan reject.",
        });
      },
    });
  };

  const openApprove = () => {
    setConfirmModal({
      ...confirmModal,
      visible: true,
      title: "Konfirmasi",
      content: "Apakah kamu yakin approve banner ini?",
      onOk: () => {
        closeModalConfirm();
        setAlert({
          ...alert,
          visible: true,
          message: "Berhasil melakukan Approve.",
        });
      },
    });
  };

  const openDelete = () => {
    setConfirmModal({
      ...confirmModal,
      visible: true,
      title: "Konfirmasi",
      content: "Apakah kamu yakin delete banner ini?",
      onOk: () => {
        closeModalConfirm();
        setAlert({
          ...alert,
          visible: true,
          message: "Berhasil melakukan delete.",
        });
      },
    });
  };

  const onChangeStatus = (type) => {
    setConfirmModal({
      ...confirmModal,
      visible: true,
      title: "Konfirmasi",
      content: `Apakah kamu yakin ${type} banner ini?`,
      onOk: () => {
        closeModalConfirm();
        setAlert({
          ...alert,
          visible: true,
          message: `Berhasil melakukan ${type}.`,
        });
      },
    });
  };

  const closeModalConfirm = () => {
    setConfirmModal({
      ...confirmModal,
      visible: false,
    });
  };

  const [alert, setAlert] = useState({
    message: "",
    visible: false,
  });

  const navigate = useNavigate();

  const goToPage = (page) => {
    navigate(page, { replace: true });
  };

  const handleMenuClick = (event, type = "") => {
    switch (event) {
      case "detail":
        goToPage("detail/1");
        return;
      case "status":
        onChangeStatus(type);
        return;
      case "delete":
        openDelete();
        return;
      default:
        return;
    }
  };
  const contentAction = (record, index) => {
    return (
      <div
        style={{ display: "flex", flexDirection: "column" }}
        onClick={() => handleContentClick(index)}
      >
        <div
          style={{ cursor: "pointer", marginTop: "2px", marginBottom: "2px" }}
          onClick={() => openDetailModal(record)}
        >
          <span style={{ marginLeft: "0.5rem" }}>Lihat Detail</span>
        </div>
        <div
          style={{ cursor: "pointer", marginTop: "2px", marginBottom: "2px" }}
          onClick={() => handleMenuClick("status", record?.condition)}
        >
          <span style={{ marginLeft: "0.5rem" }}>
            {record?.condition?.toLowerCase() !== "inactive"
              ? "Inactive"
              : "Active"}
          </span>
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
      title: "Nama Banner",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
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
      render: (_, record, index) =>
        isAdmin ? (
          record?.status?.toLowerCase() === "submitted" ? (
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
          ) : null
        ) : (
          <Popover
            content={contentAction(record, index)}
            trigger="click"
            placement="bottomRight"
            open={popoverVisible[index]}
            onOpenChange={(visible) => handleVisibleChange(visible, index)}
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

  const [popoverVisible, setPopoverVisible] = useState({});

  const handleVisibleChange = (visible, recordKey) => {
    setPopoverVisible((prevState) => ({
      ...prevState,
      [recordKey]: visible,
    }));
  };

  const handleContentClick = (recordKey) => {
    setPopoverVisible((prevState) => ({
      ...prevState,
      [recordKey]: false,
    }));
  };

  const data = [
    {
      id: "1",
      name: "Ruangan Band",
      image: 32,
      condition: "Active",
      status: "Submitted",
    },
    {
      id: "2",
      name: "Ruang Karaoke",
      image: 10,
      condition: "Inactive",
      status: "Approved",
    },
    {
      id: "3",
      name: "Area Panggung",
      image: 25,
      condition: "Active",
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
      <RoomBannerModal
        type={modalProps.type}
        alert={alert}
        setAlert={setAlert}
        visible={modalProps?.visible}
        data={modalProps?.data}
        onClose={() => setModalProps({ ...modalProps, visible: false })}
      />
      <HeaderWrapper>
        <Title>Banner Ruangan</Title>
        <AddButton onClick={openModal}>+ Tambah Baru</AddButton>
      </HeaderWrapper>
      <SearchWrapper>
        <Input
          className="my-[16px] w-[40%]"
          size="large"
          placeholder="Cari banner ruangan disini . . ."
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

export default RoomBanner;

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

const ButtonApprove = styled.div`
  padding: 4px 8px;
  border-radius: 8px;
  display: flex;
  color: #00aa5b;
  border: 1px solid #d3d3d3;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background: white;
`;

const ButtonReject = styled.div`
  padding: 4px 8px;
  border-radius: 8px;
  display: flex;
  color: #fb2121;
  border: 1px solid #d3d3d3;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background: white;
`;
