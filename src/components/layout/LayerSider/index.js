import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu,Icon } from 'antd';
import MenuConfig from './../../../routes/menuConfig';
import { withRouter } from 'react-router-dom';
import './index.less';

const SubMenu = Menu.SubMenu;
class LayerSider extends Component {
	constructor(props) {
    super(props);
    this.state = {
        currentKey:'', //当前页面
        menuTreeNode: [],
        selectedKey:'',
        account:""
    }
  }
  componentWillMount(){
      if(localStorage.getItem("account")==="admin"){
          this.setState({
              menuTreeNode:this.renderMenu(MenuConfig.menuList)
          })
      }else{
          this.setState({
              menuTreeNode:this.renderMenu(MenuConfig.menuList1)
          })
      }

  }
  onTitleClick=(key,dom)=>{
	   // console.log(key,dom)
  };
  handleClick = ({ item, key }) => {
        if (key == this.state.currentKey) {
            return false;
        }
        // 事件派发，自动调用reducer，通过reducer保存到store对象中
        // const { dispatch } = this.props;
        // dispatch(switchMenu(item.props.title));

        this.setState({
            currentKey: key
        });
        // hashHistory.push(key);
    };
  renderMenu = (data)=>{ //菜单渲染
    const _this=this;
    return data.map((el,i)=>{
      if(el.children&&el.children.length){
        return (
          <SubMenu key={el.key}
            title={
              <span>
                {el.icon && <Icon type={el.icon} />}
                <span className="nav-text">{el.title}</span>
              </span>
            }
            onTitleClick={this.onTitleClick}>
            {_this.renderMenu(el.children)}
          </SubMenu>
        )
      }
      return (<Menu.Item key={el.key}><NavLink to={el.key}>
          {el.icon && <Icon type={el.icon} />}
          <span className="nav-text">{el.title}</span>
        </NavLink>
      </Menu.Item>)
    })
  }
  render() {
    return (
      <div className="LayerSider">
        <Menu mode="inline" onClick={this.handleClick} selectedKeys={[this.props.history.location.pathname]}>
          { this.state.menuTreeNode }
        </Menu>      
      </div>
    );
  }
}

export default withRouter(LayerSider);
