import { BadgePrimary, BadgeSecondary } from "components/Badge";
import { Button, Input, Popover, Space, Table, message } from "antd";
import React, { useState } from "react";

import { ReactComponent as BackIcon } from "assets/icons/back-icons.svg";
import Chip from "components/Chip/Chip";
import { DownOutlined } from "@ant-design/icons";
import { ReactComponent as SearchIcon } from "assets/icons/search.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const DetailSportClass = () => {
  const [status, setStatus] = useState("all");
  const navigate = useNavigate();

  const goToPage = (page) => {
    navigate(page, { replace: true });
  };
  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const contentAction = (record) => {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{ cursor: "pointer", marginTop: "2px", marginBottom: "2px" }}
          onClick={handleMenuClick}
        >
          <span style={{ marginLeft: "0.5rem" }}>Lihat Detail</span>
        </div>
        <div
          style={{ cursor: "pointer", marginTop: "2px", marginBottom: "2px" }}
          onClick={handleMenuClick}
        >
          <span style={{ marginLeft: "0.5rem" }}>Lihat Peserta</span>
        </div>
        <div
          style={{ cursor: "pointer", marginTop: "2px", marginBottom: "2px" }}
          onClick={handleMenuClick}
        >
          <span style={{ marginLeft: "0.5rem" }}>Inactive</span>
        </div>

        <div
          style={{ cursor: "pointer", marginTop: "2px", marginBottom: "2px" }}
          onClick={handleMenuClick}
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

  const data = [
    {
      key: "1",
      name: "Ruang Senam",
      time: "01/01/2024, 04:00",
      desc: "",
      quota: 23,
      location: "Lantai G",
      duration: "2 Jam",
      status: "Created",
    },
    {
      key: "2",
      name: "Ruang Asik",
      time: "01/05/2024, 05:00",
      desc: "",
      quota: 25,
      location: "Lantai 31",
      duration: "2 Jam",
      status: "Created",
    },
  ];
  return (
    <Wrapper>
      <BackWrapper onClick={() => goToPage("/sport")}>
        <BackIcon />
        <BackText>Lihat Peserta</BackText>
      </BackWrapper>

      <HeaderWrapper>
        <Title>Sport Class</Title>
        <AddButton>+ Tambah Baru</AddButton>
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
    </Wrapper>
  );
};

export default DetailSportClass;

const Wrapper = styled.div`
  display: grid;
  gap: 16px;
  cursor: pointer;
`;

const BackWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const BackText = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

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
