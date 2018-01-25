import React from 'react';
import { connect } from 'react-redux';
import { submitToDo } from '../actions/action'

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      todo: '',
      todoArr: [],
      update: ''
    }
    // console.log(this.props)
  }

  onChangeHandler(e){
    // console.log(this.state.todo)
    this.setState({
      [e.target.name] : e.target.value
      }
    )
  }

  submit(){
    // console.log("Todo", this.state.todo)
    // let arrTodo = this.state.todo.push()
    let todo = this.state.todo
    // eslint-disable-next-line
    let arrTodo = this.state.todoArr.push(todo)
    // console.log(this.props)

    this.props.submit(this.state.todoArr)
    // console.log(this.state.todo)
    // console.log(this.state.todoArr)
    // console.log(arrTodo)
  }

  deleteToDo(i){
    // console.log(i)
    this.state.todoArr.splice(i,1);
    this.setState({
      update: ''
    })
  }

  editToDo(i, todoText){
    let newText = prompt('Edit todo:', todoText);
    if (newText) {
        this.state.todoArr.splice(i, 1, newText);
  }
  this.setState({
    update: ''
  })
}
  render() {
    
    // console.log(this.props)
    return (
      <div>
        <h2>Todo</h2>
        <br />
        <br />
        <div className="form-group">
          <label>Add ToDo</label>
          <input type="text" onChange={this.onChangeHandler.bind(this)} name="todo" className="form-control" id="formGroupExampleInput" placeholder="Add Todo" />

          <br />
          <button type="button" className="btn btn-primary" onClick={this.submit.bind(this)}>Submit</button>

          <hr />


          {
                  
            // console.log(this.props.todo)
            // <h1>{`Welcome ${this.props.user.email}`}</h1>
            // console.log(this.props.user.email)

            this.state.todoArr.map((todo, index) => {
              return(
                <div key={index} >
              <li>{todo}</li>
              <button onClick={ () => {this.deleteToDo(index)} }>Delete</button>
              <button onClick={ () => {this.editToDo(index,todo)} }>Edit</button>
                </div>
            )
            })            

          }

        </div>
      </div>
    )
  }



}

function mapStateToProp(state) {
  // console.log(state)
    return ({
        user: state.root.currentUser,
        todo: state.root.todo,
        uid: state.root.uid,
        allUsers: state.root.allUsers
    })
    
}
function mapDispatchToProp(dispatch) {
    return ({
        submit: (todo)=>{
            dispatch(submitToDo(todo))
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Home);

// export default Home;
