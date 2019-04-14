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

class Count extends Component {
  render() {
    return (
      <div>
        <h1>
          {this.props.number}
        </h1>
        <button onClick={()=>this.props.add(1)}> + 1</button>
        <button onClick={()=>this.props.minus(1)}> - 1</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Count)