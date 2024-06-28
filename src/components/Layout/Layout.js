import {
  AppstoreOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { ReactComponent as Notif } from "assets/icons/notif.svg";
import styled from "styled-components";
import { useAuth } from "contexts/AuthContext";

const { Header, Sider, Content } = Layout;
const CustomLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const goToPage = (page) => {
    navigate(page, { replace: true });
  };

  const items = [
    {
      label: (
        <p
          target="_blank"
          rel="noopener noreferrer"
          onClick={logout}
        >
          Logout
        </p>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
  ];
  return (
    <Layout>
      <Header
        theme="light"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <HeaderWrapper>
          <p className="font-bold text-[28px]">
            <span>Employe</span>
            <span className="text-[#EE2E24]">Corner</span>
          </p>
          <RightWrapper>
            <Notif />
            <Dropdown
              menu={{
                items,
              }}
            >
              <AvatarWrapper>
                <Avatar size={24} icon={<UserOutlined />} />
                <DownOutlined />
              </AvatarWrapper>
            </Dropdown>
          </RightWrapper>
        </HeaderWrapper>
      </Header>
      <Layout>
        <Sider
          theme="light"
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 64,
            bottom: 0,
          }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <WrapperMenuHide
            collapsed={collapsed}
            onClick={() => setCollapsed(!collapsed)}
          >
            {!collapsed ? (
              <ArrowLeftOutlined width={24} />
            ) : (
              <ArrowRightOutlined width={24} />
            )}
            {!collapsed && <p>Hide Menu</p>}
          </WrapperMenuHide>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["11"]}
            items={[
              {
                key: "1",
                icon: <AppstoreOutlined />,
                label: "Master",
                children: [
                  {
                    key: "11",
                    label: "Sport Class",
                    onClick: () => goToPage("/sport"),
                  },
                  {
                    key: "12",
                    label: "Room",
                    onClick: () => goToPage("/room"),
                  },
                ],
              },
            ]}
          />
        </Sider>
        <Content
          style={{
            marginLeft: collapsed ? 100 : 220,
            marginRight: 20,
            marginTop: 20,
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default CustomLayout;

const WrapperMenuHide = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  padding: 16px;
  border-bottom: 1px solid #e9e9e9;
  gap: 8px;
  justify-content: ${(props) => (props.collapsed ? "center" : "unset")};
  p {
    font-size: 16px;
    font-weight: 700;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const RightWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const AvatarWrapper = styled.div`
  display: flex;
  gap: 8px;
  cursor: pointer;
`;
