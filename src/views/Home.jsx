import React, { Component } from 'react';
import http from '@/libs/http';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { todo_add, todo_delete, getList } from '../redux/actions';


const mapStateToProps = ({ todo })=>({
  todoList: todo.todoList
})
// const mapDispatchToProps = (dispatch)=>({
//   add: (data)=> dispatch(todo_add(data)),
//   delete: (data)=> dispatch(todo_delete(data)),
//   getList: async () => dispatch(getList())
// })
const mapDispatchToProps = (dispatch)=>(bindActionCreators({
    add: todo_add,
    delete: todo_delete,
    getList: getList
  }, dispatch)
)

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  async componentDidMount(){
    await this.props.getList()
    http('getActInfo',{
      os: 3,
      la: 0
    }).then(data => console.warn(data))
    http('coinInfo',{
      cn: 'eth',
    }).then(data => console.warn(data))
    http('recommPairs').then(data => console.warn(data))
  }


  render() {
    return (
      <div>
        <h1>
          Home
        </h1>
        {
          this.props.todoList.map(v=>(
            <div key={v.index}>
              <p>
                {v.content}
                <button onClick={()=>{this.props.delete({index: v.index})}}>删除</button>
              </p>
            </div>
          ))
        }
        <div className="options">
          <input
            value={this.state.value}
            onChange={(e)=>this.setState({value:e.target.value})}
            type="text"
          />
          <button onClick={()=>{
            this.props.add(
              {
                index: Math.floor(Math.random()*10000000) + '_' + (new Date() - 0),
                content: this.state.value
              })
            }
          }>
            增加
          </button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)