import React, { Component } from 'react';
import { connect } from 'react-redux';
import { count_add, count_minus } from '../redux/actions';

const mapStateToProps = ({ count })=>({
  number: count.number
})
const mapDispatchToProps = (dispatch)=>({
  add: (data) => dispatch(count_add(data)),
  minus: (data) => dispatch(count_minus(data)),
})

class User extends Component {
  render() {
    return (
      <div>
        <h1>User</h1>
        <h1>
          {this.props.number}
        </h1>
        <button onClick={()=>this.props.add(10)}> + 10</button>
        <button onClick={()=>this.props.minus(10)}> - 10</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)