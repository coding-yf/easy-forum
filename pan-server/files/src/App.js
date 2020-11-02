import React from 'react';
//路由
import {HashRouter} from 'react-router-dom';
import { Router, Route} from 'react-router';
//组件（准确说来是两个页面）
import Home from "./components/home";
import Main from './components/main';
import LoginContainer from './pages/LoginContainer.js';
//redux
import { Provider } from 'react-redux'
import {store} from './store';

class App extends React.Component {
  render(){
    return (
      <Provider store={store}>
        <HashRouter>
          <Route path="/" exact component={Home}/>
          <Route path='/main' exact component={Main}/>
          <Route path='/login' component={LoginContainer}/>
        </HashRouter>
      </Provider>
    )
  }
}

export default App;
