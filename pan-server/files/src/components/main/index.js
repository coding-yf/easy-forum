import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb, Button, PageHeader, Upload, Card } from 'antd';
import "./index.css";
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import {withRouter} from "react-router-dom";
const { Header, Content, Footer } = Layout;

class TMain extends Component{
  constructor(){
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentWillMount(){
    //在用户未登录的情况下，自动跳转到登录页面
    let username = localStorage.getItem("username");
    if(!username){
      this.props.history.push("/login");
    }
  }
  handleLogout(){
    //访问/logout接口
    axios.defaults.headers.common['withCredentials'] = true;
    axios.get('/logout').then(res => {
      //退出登录成功，清除localStorage中的username字段，并且将页面跳转到/login
      console.log(res.data.msg);
      localStorage.removeItem("username");
      this.props.history.push("/login");
    }).catch(err => {
      //退出登录失败
      console.log("退出登录失败", err);
    })
  }
  render(){
    const fileList = [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'yyy.png',
        status: 'error',
      },
    ];
    return (
      <Layout className="layout">
        <Button onClick={this.handleLogout}>退出登录</Button>
        <input title="点击选择文件夹" id="h5Input2" multiple="multiple" webkitdirectory="" directory accept="*/*" type="file" name="html5uploader" />
        <PageHeader
          className="site-page-header"
          onBack={() => null}
          title="当前文件名称"
          subTitle="This is a subtitle"
        />
        <Content style={{ padding: '10px 50px' }}>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            // listType="picture"
            defaultFileList={[...fileList]}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    )
  }
}

const Main = withRouter(TMain);

export default Main;

