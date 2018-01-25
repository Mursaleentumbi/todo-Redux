import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { submitToDo } from '../actions/action'
import './Comp.css';
import firebase from 'firebase'

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

  onChangeHandler(e) {
    // console.log(this.state.todo)
    this.setState({
      [e.target.name]: e.target.value
    }
    )
  }

  submit(ev) {
    // console.log("Todo", this.state.todo)
    // let arrTodo = this.state.todo.push()
    let todo = this.state.todo
    // eslint-disable-next-line
    let arrTodo = this.state.todoArr.push(todo);
    // console.log(this.props)
    firebase.database().ref('todos/ ' + this.props.uid).set(this.state.todoArr);


    this.props.submit(this.state.todoArr)
    // console.log(this.state.todo)
    // console.log(this.state.todoArr)
    // console.log(arrTodo)
  }

  deleteToDo(i) {
    // console.log(i)
    this.state.todoArr.splice(i, 1);
    let currentUser = firebase.auth().currentUser.uid;
    console.log(firebase.database().ref('todos'))
    firebase.database().ref('todos/' + currentUser  + i).remove(i).then(()=>{
      console.log('Deleted from database');
    })
              this.setState({
                update: ''
              })
  }

  editToDo(i, todoText) {
    let newText = prompt('Edit todo:', todoText);
    if (newText) {
      this.state.todoArr.splice(i, 1, newText);
    }
    this.setState({
      update: ''
    })
    // let currentUser = firebase.auth().currentUser.uid;    
    // firebase.database().ref('todos/' + currentUser + i).update({i} ).then(()=>{
    //   console.log('Updated in Database')
    // })
  }

  deleteAll(){
    let currentUser = firebase.auth().currentUser.uid;
    firebase.database().ref('todos/' + currentUser).remove().then(()=>{
      console.log("All deleted")
    })
  }
  render() {

    // console.log(this.props)
    return (
      <div className="firstdiv">
        <h2 className="heading">Todo</h2>
        <br />
        <br />
        <div className="form-group">
          {////////////////////////

            (this.props.isAuth) ?
              <div>
                {/* <label>Add ToDo</label> */}

                <input type="text" onChange={this.onChangeHandler.bind(this)} name="todo" className="form-control input" id="formGroupExampleInput" placeholder="Add Todo" />

                <br />
                <button type="button" className="btn btn-primary" onClick={this.submit.bind(this)}>Add</button>
                <br />
                <br />

              </div>
              : <div> <h3>Please <button className="btn black" ><Link to="/signin">Sign In</Link></button></h3>
              </div>
          }
          {
            (this.props.delete) ?
              <div>
                <button onClick={this.deleteAll.bind(this)} >Delete</button>
                
              </div>

              : 
              ''



            /////////////////////////}
          }


          {/* {console.log(this.props)} */}

          {

            // console.log(this.props.todo)
            // <h1>{`Welcome ${this.props.user.email}`}</h1>
            // console.log(this.props.user.email)

            this.state.todoArr.map((todo, index) => {
              return (
                <div key={index} >
                  {/* <li className="list-group"><span className="list-group-item"> {todo} </span>
                  </li>
                  <button className="btn btn-secondary btn-sm" onClick={() => { this.deleteToDo(index) }}>Delete</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => { this.editToDo(index, todo) }}>Edit</button>
                  <br />
                  <br /> */}

                  <div className="card-body">
                    <li className="card-text inline">{todo}</li>
                    <button className="btn btn-secondary btn-sm inline" onClick={() => { this.deleteToDo(index) }}>Delete</button>
                    <button className="btn btn-secondary btn-sm inline" onClick={() => { this.editToDo(index, todo) }}>Edit</button>
                  </div>
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
    uid: state.root.currentUserUid,
    allUsers: state.root.allUsers,
    isAuth: state.root.isAuth,
    delete: state.root.delete,
  })

}
function mapDispatchToProp(dispatch) {
  return ({
    submit: (todo) => {
      dispatch(submitToDo(todo))
    }
  })
}

export default connect(mapStateToProp, mapDispatchToProp)(Home);

// export default Home;
