import React, { Component } from 'react';

export default class Home extends Component {
  constructor(){
    super();
    this.state = {
      a: 99
    }
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.a}
          99d9
          <button onClick={()=>this.setState({a: this.state.a - 2})}>-</button>
          <input type="text"/>
        </h1>
      </div>
    )
  }
}
