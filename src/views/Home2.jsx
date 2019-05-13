import React, { Component } from 'react';

export default class Home extends Component {
  state = {
    a: 666
  }
  constructor() {
    super();
    this.a = 999;
  }
  
  render() {
    console.log(this.state)
    return (
      <div>
        <h1>
          Home
        </h1>
        <h2>{this.state.a}</h2>
      </div>
    )
  }
}
