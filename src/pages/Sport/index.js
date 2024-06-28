import { Button, Dropdown, Space, Table, message } from "antd";

import { DownOutlined } from "@ant-design/icons";
import React from "react";

const SportClass = () => {
  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };
  const items = [
    {
      label: "Lihat Detail",
      key: "1",
    },
    {
      label: "Approve",
      key: "2",
    },
    {
      label: "Reject",
      key: "3",
    },
    {
      label: "Cancel",
      key: "4",
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const columns = [
    {
      title: "Nama Sport Class",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Waktu Acara",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Deskripsi Acara",
      dataIndex: "desc",
      key: "desc",
      render: (_, { desc }) => <>{desc || "-"}</>,
    },
    {
      title: "Quota Peserta",
      key: "quota",
      dataIndex: "quota",
    },
    {
      title: "Lokasi",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Durasi",
      dataIndex: "duration",
      key: "duration",
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
        <Dropdown menu={menuProps}>
          <Button>
            <Space>
              Atur
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
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
  return <Table columns={columns} dataSource={data} />;
};

export default SportClass;
