import React from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import axios from "axios";
import {withRouter } from 'react-router';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class TForm extends React.Component{
  constructor(){
    super();
    this.onFinish = this.onFinish.bind(this);
  }
  //当点击登录按钮的时候会调用此函数
  onFinish(values){
    const {username, password} = values;
    axios.defaults.headers.common['withCredentials'] = true;
    axios.post('/login',{
      username,
      password
    }).then(res => {
      localStorage.setItem("username", res.data.username);
      this.props.history.push("/main");
    }).catch(err => {
      alert(err);
    })
  }
  render(){
    return (
      <Form
        {...layout}
        name="basic"
        onFinish={this.onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <h2>账号密码登录</h2>
        <Form.Item
          label="用户名"
          name="username"
          initialValue="yf"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          initialValue="123"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const LoginForm = withRouter(TForm)

export default LoginForm;