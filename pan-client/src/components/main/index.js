import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb, Button, PageHeader, Upload, Card, Table } from 'antd';
import "./index.css";
import { UploadOutlined, FolderOpenOutlined, FileTextOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import axios from "axios";
import {withRouter, Route} from "react-router-dom";
import MyContent from "./MyContent.js";
const { Footer } = Layout;

class TMain extends Component{
  constructor(){
    super();
    this.state = {
      files: []
    }
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
    axios.defaults.headers.common['withCredentials'] = true;
    axios.get('/logout').then(res => {
      //退出登录成功，清除localStorage中的username字段，并且将页面跳转到/login
      localStorage.removeItem("username");
      this.props.history.push("/login");
    }).catch(err => {
      //退出登录失败
      console.log("退出登录失败", err);
    })
  }
  render(){
    return (
      <Layout className="layout">
        <PageHeader
          className="page-header"
          onBack={() => window.history.back()}
          title="Hello, yf"
          extra={[
            <Button type="primary" onClick={this.handleLogout}>退出登录</Button>
          ]}
        />
        <hr/>
        <Route path="/main" exact component={MyContent}/>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    )
  }
}

const Main = withRouter(TMain);

export default Main;

