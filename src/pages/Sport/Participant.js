import { BadgePrimary, BadgeSecondary } from "components/Badge";
import { Button, Input, Popover, Space, Table, message } from "antd";
import React, { useState } from "react";

import { ReactComponent as BackIcon } from "assets/icons/back-icons.svg";
import Chip from "components/Chip/Chip";
import { ReactComponent as Clock } from "assets/icons/clock.svg";
import { DownOutlined } from "@ant-design/icons";
import { Poundfit } from "assets/images/class";
import { ReactComponent as SearchIcon } from "assets/icons/search.svg";
import { ReactComponent as Users } from "assets/icons/users.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ParticipantSportClass = () => {
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
      title: "No",
      key: "no",
      render: (_,record,index) => <p>{index+1}</p>,
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
      title: "No. HP",
      key: "phone",
      dataIndex: "phone",
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
      name: "Rahmat A",
      phone: "08934785683",
      status: "Waiting",
      nik: "1234567890",
      unit: "Brandcomm",
    },
    {
      name: "Yoga S",
      phone: "08934785683",
      status: "Waiting",
      nik: "1234567890",
      unit: "Brandcomm",
    },
    {
      name: "Irfan T",
      phone: "08934785683",
      status: "Approved",
      nik: "1234567890",
      unit: "Brandcomm",
    },
    {
      name: "Kemal S",
      phone: "08934785683",
      status: "Waiting",
      nik: "1234567890",
      unit: "Brandcomm",
    },
    {
      name: "Arif",
      phone: "08934785683",
      status: "Approved",
      nik: "1234567890",
      unit: "Brandcomm",
    },
    {
      name: "Naufal Ridi",
      phone: "08934785683",
      status: "Rejected",
      nik: "1234567890",
      unit: "Brandcomm",
    },
    {
      name: "Aisyah W",
      phone: "08934785683",
      status: "Rejected",
      nik: "1234567890",
      unit: "Brandcomm",
    },
  ];
  return (
    <Wrapper>
      <BackWrapper onClick={() => goToPage("sport")}>
        <BackIcon />
        <BackText>Lihat Peserta</BackText>
      </BackWrapper>

      <ContentWrapper>
        <Image src={Poundfit} alt="photo" />
        <TitleWrapper>
          <Date>Senin, 20 Mei 2024</Date>
          <Title>Poundfit</Title>
          <BadgeWrapper>
            <GreyBadge>
              <Users />
              Kuota 20 orang
            </GreyBadge>
            <GreyBadge>
              <Clock />
              16.00-17.00
            </GreyBadge>
          </BadgeWrapper>
        </TitleWrapper>
      </ContentWrapper>

      <HeaderWrapper>
        <Title>Sport Class</Title>
        <AddButton>10/20</AddButton>
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

export default ParticipantSportClass;

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
`;

const ContentWrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
  gap: 8px;
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

const Date = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #1e1e1e;
  text-transform: uppercase;
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
