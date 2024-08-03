import { BadgePrimary, BadgeSecondary } from "components/Badge";
import { Button, Popover, Space, Table, message } from "antd";
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
import twService from "utils/services";
import useGetRoomBannerList from "hooks/useGetRoomBannerList";

const RoomBanner = () => {
  const [messageApi, contextHolder] = message.useMessage();
  // eslint-disable-next-line no-unused-vars
  const [loadingModal, setLoadingModal] = useState(false);
  const [params, setParams] = useState({ name: "", page: 1, status: "all" });
  const { data, loading, fetchData } = useGetRoomBannerList(params);
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
      type: "add",
    });
  };

  const [confirmModal, setConfirmModal] = useState({
    visible: false,
    title: "",
    content: "",
    onOk: () => {},
  });

  const handleTableChange = (event) => {
    setParams({
      ...params,
      page: event?.current,
    });
  };


  const onApprove = async (id) => {
    setLoadingModal(true);
    try {
      await twService.post(`banners/room/${id}/approve`); // Replace with your API endpoint
      closeModalConfirm();
      setAlert({
        ...alert,
        visible: true,
        message: "Berhasil melakukan Approve.",
      });
      fetchData();
    } catch (error) {
      messageApi.open({
        type: "error",
        content:
          error?.response?.data?.message ||
          "Terjadi kesalahan di sistem, silakan hubungi admin.",
      });
    } finally {
      setLoadingModal(false);
    }
  };

  const onReject = async (id) => {
    setLoadingModal(true);
    try {
      await twService.post(`banners/room/${id}/reject`); // Replace with your API endpoint
      closeModalConfirm();
      setAlert({
        ...alert,
        visible: true,
        message: "Berhasil melakukan Reject.",
      });
      fetchData();
    } catch (error) {
      messageApi.open({
        type: "error",
        content:
          error?.response?.data?.message ||
          "Terjadi kesalahan di sistem, silakan hubungi admin.",
      });
    } finally {
      setLoadingModal(false);
    }
  };
  
  const openReject = (id) => {
    setConfirmModal({
      ...confirmModal,
      visible: true,
      title: "Konfirmasi",
      content: "Apakah kamu yakin reject banner ini?",
      onOk: () => onReject(id),
    });
  };

  const openApprove = (id) => {
    setConfirmModal({
      ...confirmModal,
      visible: true,
      title: "Konfirmasi",
      content: "Apakah kamu yakin approve banner ini?",
      onOk: () => onApprove(id),
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

  const handleMenuClick = (record, event, type = "") => {
    switch (event) {
      case "status":
        openChangeStatus(record?.id, type);
        return;
      case "delete":
        openDelete(record?.id);
        return;
      default:
        return;
    }
  };

  const openDelete = (id) => {
    setConfirmModal({
      ...confirmModal,
      visible: true,
      title: "Konfirmasi",
      content: "Apakah kamu yakin delete ruangan ini?",
      onOk: () => onDelete(id),
    });
  };

  const onDelete = async (id) => {
    setLoadingModal(true);
    try {
      await twService.delete(`banners/hero/${id}`); // Replace with your API endpoint
      closeModalConfirm();
      setAlert({
        ...alert,
        visible: true,
        message: "Berhasil melakukan delete, menunggu approval checker.",
      });
      fetchData();
    } catch (error) {
      messageApi.open({
        type: "error",
        content:
          error?.response?.data?.message ||
          "Terjadi kesalahan di sistem, silakan hubungi admin.",
      });
    } finally {
      setLoadingModal(false);
    }
  };

  const openChangeStatus = (id, type) => {
    setConfirmModal({
      ...confirmModal,
      visible: true,
      title: "Konfirmasi",
      content: `Apakah kamu yakin ${
        type?.toLowerCase() === "active" ? "deactivate" : "activate"
      } ruangan ini?`,
      onOk: () =>
        fetchChangeStatus(
          id,
          type?.toLowerCase() === "active" ? "deactivate" : "activate"
        ),
    });
  };
  const fetchChangeStatus = async (id, type) => {
    setLoadingModal(true);
    try {
      await twService.put(`banners/room/${id}/${type}`); // Replace with your API endpoint
      closeModalConfirm();
      setAlert({
        ...alert,
        visible: true,
        message: `Berhasil melakukan ${
          type?.toLowerCase() === "activate" ? "aktivasi" : "deaktivasi"
        }.`,
      });
      fetchData();
    } catch (error) {
      messageApi.open({
        type: "error",
        content:
          error?.response?.data?.message ||
          "Terjadi kesalahan di sistem, silakan hubungi admin.",
      });
    } finally {
      setLoadingModal(false);
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
          onClick={() => handleMenuClick(record, "status", record?.condition)}
        >
          <span style={{ marginLeft: "0.5rem" }}>
            {record?.condition?.toLowerCase() !== "inactive"
              ? "Inactive"
              : "Active"}
          </span>
        </div>

        <div
          style={{ cursor: "pointer", marginTop: "2px", marginBottom: "2px" }}
          onClick={() => handleMenuClick(record, "delete")}
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
        localStorage.getItem("role")?.includes("checker") ? (
          record?.status?.toLowerCase() === "submitted" ? (
            <Space>
              <ButtonReject onClick={() => openReject(record?.id)}>
                <Space>
                  <CrossIcon />
                  Reject
                </Space>
              </ButtonReject>
              <ButtonApprove onClick={() => openApprove(record.id)}>
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

  return (
    <Fragment>
      {contextHolder}
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
        loading={loadingModal}
      />
      <RoomBannerModal
        type={modalProps.type}
        alert={alert}
        setAlert={setAlert}
        visible={modalProps?.visible}
        data={modalProps?.data}
        onClose={() => setModalProps({ ...modalProps, visible: false })}
        refetch={fetchData}
      />
      <HeaderWrapper>
        <Title>Banner Ruangan</Title>
        {localStorage.getItem("role")?.includes("maker") && (
          <AddButton onClick={openModal}>+ Tambah Baru</AddButton>
        )}
      </HeaderWrapper>
      <SearchWrapper>
        <Input
          className="my-[16px] w-[40%]"
          size="large"
          placeholder="Cari banner ruangan disini . . ."
          onChange={(e) => setParams({ ...params, name: e.target.value })}
          prefix={<SearchIcon />}
        />
        <ChipWrapper>
          <Chip
            label={"Semua"}
            active={params.status === "all"}
            onClick={() => setParams({ ...params, status: "all" })}
          />
          <Chip
            label={"Submitted"}
            active={params.status === "submitted"}
            onClick={() => setParams({ ...params, status: "submitted" })}
          />
          <Chip
            label={"Approved"}
            active={params.status === "approved"}
            onClick={() => setParams({ ...params, status: "approved" })}
          />
          <Chip
            label={"Cancelled"}
            active={params.status === "cancelled"}
            onClick={() => setParams({ ...params, status: "cancelled" })}
          />
        </ChipWrapper>
      </SearchWrapper>
      <Table
        scroll={{ x: true }}
        columns={columns}
        dataSource={data?.data}
        loading={loading}
        pagination={{
          total: data?.meta?.total,
          current: params?.page,
        }}
        onChange={handleTableChange}
      />
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
  align-items: center;
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
