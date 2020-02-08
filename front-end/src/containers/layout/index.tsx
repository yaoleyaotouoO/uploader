import * as React from 'react';
import { Layout as AntdLayout, Menu, Row, Col, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './index.less';
import { ClickParam } from 'antd/lib/menu';

const { Header, Sider, Content } = AntdLayout;

const Layout = (props: ILayoutProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [current, setCurrent] = useState<string>('1');
  const { history, children } = props;

  const handleClick = (e: ClickParam) => {
    console.log("1111");
    setCurrent(e.key);
  };

  return <AntdLayout className="layout-page" style={{ height: '100%' }}>
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" >TEST</div>
      <Menu
        theme="dark"
        mode="inline"
        onClick={handleClick}
        selectedKeys={[current]}
      >
        <Menu.Item key="1" onClick={() => history.push('/gallery')}>
          <UserOutlined />
          <span>Gallery</span>
        </Menu.Item>
        <Menu.Item key="2" onClick={() => history.push('/combine')}>
          <VideoCameraOutlined />
          <span>Combine</span>
        </Menu.Item>
      </Menu>
    </Sider>
    <AntdLayout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => setCollapsed(!collapsed),
        })}
      </Header>
      <Content
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
        }}
      >
        {children}
      </Content>
    </AntdLayout>
  </AntdLayout>;
};

interface ILayoutProps extends Partial<RouteComponentProps> {
  children?: React.ReactNode;
}

export default withRouter(Layout);