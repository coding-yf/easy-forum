import React, {Component} from 'react';
import './index.css';
import {connect} from 'react-redux';
import LoginForm from "./LoginForm";

class Login extends Component{
  constructor(){
    super();
    this.state = {
      inputValue: ''
    }
  }

  render(){
    return (
      <div className="parent">
        <div className="son">
          <LoginForm/>
        </div>
      </div>
    )
  }
}

export default Login;

