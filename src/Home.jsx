import React, { Component } from 'react';

export default class Home extends Component {
  constructor(){
    super();
    this.state = {
      a: 100
    }
  }

  componentDidMount(){
    this.es6();
    fetch('/v4/live/list?reading=false&limit=20&sort=&flag=down&id=0&_source=m').then(res=>res.json()).then(data=>console.log(data)).catch(err=>{
      console.warn(err)
    })
  }

  es6 = ()=>{
    const A = 'AAAAA';
    console.warn(A, new Promise((resovle, reject)=>{}));
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
