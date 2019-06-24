import React, { Component } from 'react';
import { Layout } from 'antd';
import LayerSider from './../layout/LayerSider';
import LayerHeader from './../layout/LayerHeader';
import LayerCrumb from './../layout/LayerCrumb';
import MenuRoutes from '../../routes/MenuRoutes';


import './index.less';
const {Header, Footer, Sider, Content} = Layout;
class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Layout>
          <Header className="Header"><LayerHeader /></Header>
          <Layout>
            <Sider className="Sider" width='220px'><LayerSider /></Sider>
            <Content className="Content">
            {/*<LayerCrumb />*/}
              <MenuRoutes/>
            </Content>
          </Layout>
          <Footer className="Footer">Footer</Footer>
        </Layout>
      </div>
    );
  }
}

export default Main;
