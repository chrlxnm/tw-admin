import { BadgePrimary, BadgeSecondary } from "components/Badge";
import { Button, Popover, Space, Table, message } from "antd";
import { ButtonApprove, ButtonReject } from "components/Button";
import React, { Fragment, useState } from "react";

import { ReactComponent as CheckIcon } from "assets/icons/check-icon.svg";
import Chip from "components/Chip/Chip";
import ClassModal from "components/ClassModal";
import ConfirmationModal from "components/ConfirmationModal";
import { ReactComponent as CrossIcon } from "assets/icons/cross-icon.svg";
import { DownOutlined } from "@ant-design/icons";
import { Input } from "components/Input";
import { ReactComponent as SearchIcon } from "assets/icons/search.svg";
import TWAlert from "components/Alert";
import styled from "styled-components";
import twService from "utils/services";
import useGetClassList from "hooks/useGetClassList";
import { useNavigate } from "react-router-dom";

const SportClass = () => {
  const [status, setStatus] = useState("all");
  const [loadingModal, setLoadingModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [params, setParams] = useState({ name: "", page: 1, status: "all" });
  const { data, loading, fetchData } = useGetClassList(params);
  // eslint-disable-next-line no-unused-vars
  const [modalProps, setModalProps] = useState({
    visible: false,
    type: "add",
    data: undefined,
  });
  const onSearch = (event) => {
    setParams({
      ...params,
      name: event.target.value,
    });
  };

  const handleTableChange = (event) => {
    setParams({
      ...params,
      page: event?.current,
    });
  };

  const onApprove = async (id) => {
    setLoadingModal(true);
    try {
      await twService.post(`schedules/${id}/approve`); // Replace with your API endpoint
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
      await twService.post(`schedules/${id}/reject`); // Replace with your API endpoint
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

  const onDelete = async (id) => {
    setLoadingModal(true);
    try {
      await twService.delete(`schedules/${id}`); // Replace with your API endpoint
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

  const fetchChangeStatus = async (id, type) => {
    setLoadingModal(true);
    try {
      await twService.put(`schedules/${id}/${type}`); // Replace with your API endpoint
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

  const openModal = (data) => {
    setModalProps({
      ...modalProps,
      visible: true,
      data: data,
      type: "add",
    });
  };

  const openDetailModal = (data) => {
    setModalProps({
      ...modalProps,
      visible: true,
      type: "detail",
      data: data,
    });
  };

  const [confirmModal, setConfirmModal] = useState({
    visible: false,
    title: "",
    content: "",
    onOk: () => {},
  });

  const openReject = (id) => {
    setConfirmModal({
      ...confirmModal,
      visible: true,
      title: "Konfirmasi",
      content: "Apakah kamu yakin reject sport class ini?",
      onOk: () => onReject(id),
    });
  };

  const openApprove = (id) => {
    setConfirmModal({
      ...confirmModal,
      visible: true,
      title: "Konfirmasi",
      content: "Apakah kamu yakin approve sport class ini?",
      onOk: () => onApprove(id),
    });
  };

  const openDelete = (id) => {
    setConfirmModal({
      ...confirmModal,
      visible: true,
      title: "Konfirmasi",
      content: "Apakah kamu yakin delete sport class ini?",
      onOk: () => onDelete(id),
    });
  };

  const onChangeStatus = (id, type) => {
    setConfirmModal({
      ...confirmModal,
      visible: true,
      title: "Konfirmasi",
      content: `Apakah kamu yakin ${
        type?.toLowerCase() === "active" ? "deactivate" : "activate"
      } kelas ini?`,
      onOk: () =>
        fetchChangeStatus(
          id,
          type?.toLowerCase() === "active" ? "deactivate" : "activate"
        ),
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

  const handleMenuClick = (record, event, type = "") => {
    switch (event) {
      case "participant":
        goToPage(`participant/${record?.id}`);
        return;
      case "status":
        onChangeStatus(record?.id, type);
        return;
      case "delete":
        openDelete(record?.id);
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
          onClick={() => handleMenuClick(record, "participant")}
        >
          <span style={{ marginLeft: "0.5rem" }}>Lihat Peserta</span>
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
      title: "Nama Sport Class",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Tanggal Acara",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Waktu Acara",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Kuota Peserta",
      key: "quota",
      dataIndex: "quota",
    },
    {
      title: "Durasi",
      dataIndex: "duration",
      key: "duration",
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
      render: (text) => <BadgePrimary color={text}>{text}</BadgePrimary>,
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
      <ClassModal
        alert={alert}
        type={modalProps.type}
        setAlert={setAlert}
        visible={modalProps?.visible}
        data={modalProps?.data}
        onClose={() => setModalProps({ ...modalProps, visible: false })}
        refetch={fetchData}
      />
      <HeaderWrapper>
        <Title>Sport Class</Title>
        {localStorage.getItem("role")?.includes("maker") && (
          <AddButton onClick={openModal}>+ Tambah Baru</AddButton>
        )}
      </HeaderWrapper>
      <SearchWrapper>
        <Input
          onChange={onSearch}
          className="my-[16px] w-[40%]"
          size="large"
          placeholder="Cari peserta disini . . ."
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
          current: params?.page,
          total: data?.meta?.total,
        }}
        onChange={handleTableChange}
      />
    </Fragment>
  );
};

export default SportClass;

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
  align-items: center;
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
