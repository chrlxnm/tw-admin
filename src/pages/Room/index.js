import { Button, Popover, Space, Table, message } from "antd";
import React, { Fragment, useState } from "react";

import Chip from "components/Chip/Chip";
import { DownOutlined } from "@ant-design/icons";
import { Input } from "components/Input";
import { ReactComponent as SearchIcon } from "assets/icons/search.svg";
import styled from "styled-components";

const Room = () => {
  const [status, setStatus] = useState("all");
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
          <span style={{ marginLeft: "0.5rem" }}>Lihat Peserta</span>
        </div>
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
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
      id: "1",
      name: "Ruangan Band",
      quota: 32,
      condition: "",
      status: ["submitted"],
    },
    {
      id: "2",
      name: "Ruang Karaoke",
      quota: 10,
      condition: "",
      status: ["submitted"],
    },
    {
      id: "3",
      name: "Area Panggung",
      quota: 25,
      condition: "",
      status: ["submitted"],
    },
  ];
  return (
  <Fragment>
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
  </Fragment>)
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