import React from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";

class THome extends React.Component {
  componentDidMount(){
    //通过localStorage看是否已经有用户登录了，若有则自动登录，若没有则跳转到登录页面    let username = localStorage.getItem("username");
    let username = localStorage.getItem("username");
    if(username){
      //表明用户已登录，完成自动登录：访问后台接口/autologin(会自动携带cookie)。
      axios.defaults.headers.common['withCredentials'] = true;
      axios.get('/autologin').then(res => {
        //自动登录成功，将页面跳转至/main
        console.log(res.data.msg);
        this.props.history.push("/main");
      }).catch(err => {
        //自动登录失败，将页面跳转至/login
        console.log(err);
        this.props.history.push("/login");
      })
    }else{
      //表明尚未有用户登录，将页面跳转到/login页面
      console.log("尚未登录，前往登录页面~")
      this.props.history.push("/login");
    }
  }
  render(){
    return (
      <div>此处是home页面</div>
    )
  }
}

let Home = withRouter(THome);

export default Home;

