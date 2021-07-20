import React, { Component } from 'react';
import img1 from '@images/one.jpg';
import img2 from '@images/2.jpg';

export default class User extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="user">
        <h1>
          User
          <img src={img1} alt=""/>
          <img src={img2} alt="" width="45%"/>
          <div className="img1"></div>
          <div className="img2"></div>
        </h1>
      </div>
    )
  }
}
