import React, { Component } from 'react';
import { Layout } from 'antd';
import LayerSider from './../layout/LayerSider';
import LayerHeader from './../layout/LayerHeader';
import MenuRoutes from '../../routes/MenuRoutes';
import './index.less';
const {Header, Footer, Sider, Content} = Layout;
class Main extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

  render() {
    return (
      <Layout className="main">
          <Header className="Header"><LayerHeader /></Header>
          <Layout>
              <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} className="Sider" width='220px' style={{minHeight:'100vh'}}><LayerSider /></Sider>
                <Content className="Content" style={{padding:"14px"}}>
                {/*<LayerCrumb />*/}
                  <MenuRoutes/>
                </Content>
          </Layout>
          {/*<Footer className="Footer">Footer</Footer>*/}
      </Layout>
    );
  }
}
export default Main;
