import { Button, Input, Popover, Space, Table, message } from "antd";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ReactComponent as BackIcon } from "assets/icons/back-icons.svg";
import { BadgePrimary } from "components/Badge";
import Chip from "components/Chip/Chip";
import { ReactComponent as Clock } from "assets/icons/clock.svg";
import ConfirmationModal from "components/ConfirmationModal";
import { DownOutlined } from "@ant-design/icons";
import { ReactComponent as SearchIcon } from "assets/icons/search.svg";
import TWAlert from "components/Alert";
import { ReactComponent as Users } from "assets/icons/users.svg";
import styled from "styled-components";
import twService from "utils/services";
import useGetRoomBookingList from "hooks/useGetRoomBookingList";
import useGetRoomDetail from "hooks/useGetRoomDetail";

const ParticipantRoom = () => {
  const [status, setStatus] = useState("all");
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: dataDetail } = useGetRoomDetail(id);
  const {
    data: bookingList,
    loading: bookingLoading,
    fetchData: fetchDataList,
  } = useGetRoomBookingList(id);
  const [messageApi, contextHolder] = message.useMessage();
  const [loadingModal, setLoadingModal] = useState(false);

  const goToPage = (page) => {
    navigate(page, { replace: true });
  };

  const [confirmModal, setConfirmModal] = useState({
    visible: false,
    title: "",
    content: "",
    onOk: () => {},
  });

  const [alert, setAlert] = useState({
    message: "",
    visible: false,
  });

  const closeModalConfirm = () => {
    setConfirmModal({
      ...confirmModal,
      visible: false,
    });
  };

  const onApprove = async (partId) => {
    setLoadingModal(true);
    try {
      await twService.put(`rooms/${id}/participants/${partId}/approve`); // Replace with your API endpoint
      closeModalConfirm();
      setAlert({
        ...alert,
        visible: true,
        message: "Berhasil melakukan Approve.",
      });
      fetchDataList();
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

  const onReject = async (partId) => {
    setLoadingModal(true);
    try {
      await twService.put(`schedules/${id}/participants/${partId}/reject`); // Replace with your API endpoint
      closeModalConfirm();
      setAlert({
        ...alert,
        visible: true,
        message: "Berhasil melakukan Reject.",
      });
      fetchDataList();
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

  const handleMenuClick = (record, event) => {
    switch (event) {
      case "accept":
        openApprove(record?.id);
        return;
      case "reject":
        openReject(record?.id);
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
          onClick={() => handleMenuClick(record, "accept")}
        >
          <span style={{ marginLeft: "0.5rem" }}>Accept</span>
        </div>

        <div
          style={{ cursor: "pointer", marginTop: "2px", marginBottom: "2px" }}
          onClick={() => handleMenuClick(record, "reject")}
        >
          <span style={{ marginLeft: "0.5rem" }}>Reject</span>
        </div>
      </div>
    );
  };

  const columns = [
    {
      title: "No",
      key: "no",
      render: (_, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Nama Peserta",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "NIK",
      dataIndex: "nik",
      key: "nik",
    },
    {
      title: "Unit/Div",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Tanggal Penggunaan",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "Waktu Mulai",
      key: "time",
      dataIndex: "time",
    },
    {
      title: "Durasi",
      key: "duration",
      dataIndex: "duration",
    },
    {
      title: "Jumlah Peserta",
      key: "participant",
      dataIndex: "participant",
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
      render: (_, record) => (
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

  return (
    <Wrapper>
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
      <BackWrapper onClick={() => goToPage("/room")}>
        <BackIcon />
        <BackText>Lihat Peserta</BackText>
      </BackWrapper>

      <ContentWrapper>
        <Image src={dataDetail?.data?.images?.[0]?.url} alt="photo" />
        <TitleWrapper>
          <Title>{dataDetail?.data?.name}</Title>
          <BadgeWrapper>
            <GreyBadge>
              <Users />
              Kuota {dataDetail?.data?.quota || 0} orang
            </GreyBadge>
            <GreyBadge>
              <Clock />
              {dataDetail?.time}
            </GreyBadge>
          </BadgeWrapper>
        </TitleWrapper>
      </ContentWrapper>

      <HeaderWrapper>
        <Title>Peserta</Title>
        <AddButton>
          {dataDetail?.joined || 0}/{dataDetail?.data?.quota || 0}
        </AddButton>
      </HeaderWrapper>
      <SearchWrapper>
        <Input
          className="my-[16px] w-[40%]"
          size="large"
          placeholder="Cari peserta disini . . ."
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
      <Table
        scroll={{ x: true }}
        columns={columns}
        dataSource={bookingList?.data}
        loading={bookingLoading}
      />
    </Wrapper>
  );
};

export default ParticipantRoom;

const Wrapper = styled.div`
  display: grid;
  cursor: pointer;
`;

const BackWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
`;

const BackText = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const AddButton = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: black;
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

const ContentWrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
  gap: 16px;
  @media screen and (max-width: 768px) {
    display: grid;
  }
`;

const Image = styled.img`
  border-radius: 8px;
  width: 250px;
  aspect-ratio: 2 / 1;
  height: auto;
  object-fit: cover;
  margin-bottom: 1px;
`;

const TitleWrapper = styled.div`
  display: grid;
`;

const BadgeWrapper = styled.div`
  display: flex;
  gap: 12px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

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
