import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root'
import Router from './Router';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <Router/>
      </div>
    )
  }
}

// 判断是否开启热更新
export default module.hot ? hot(App) : App;