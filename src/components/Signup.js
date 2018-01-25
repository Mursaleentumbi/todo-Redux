import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {signupAction} from '../actions/action'

class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            userName: '',
            email: '',
            password: '',


        }
    }

    onChangeHandler = (ev) =>{
        // console.log(this.state)
        this.setState({
            [ev.target.name] : ev.target.value
        })
    }

    signup = (e) =>{
e.preventDefault();        
        // console.log(this.props)
        let user = {
            email: this.state.email,
            userName: this.state.userName,
            password: this.state.password
        }
        this.props.signUp(user)
    }



    render() {
        return (
            <div>
            <form>
            <div className="form-group">
              <label> Name</label>
              <input type="text" onChange={this.onChangeHandler.bind(this)} name="userName" className="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder="Enter User Name" />
            </div>              
            <div className="form-group">
              <label>Email address</label>
              <input type="email" onChange={this.onChangeHandler.bind(this)} name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" onChange={this.onChangeHandler.bind(this)} name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="button" className="btn btn-primary" onClick={this.signup}>Submit</button>
            <br />
            <br />
            <br />
            <Link to="/signin">Sign In</Link>
          </form>
          </div>
             
        )
    }
}

function mapStateToProp(state) {
    return ({
        // userName: state.root.userName
    })
}

function mapDispatchToProp(dispatch) {
    return ({
        signUp: (userDetails)=>{
            dispatch(signupAction(userDetails));
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Signup);

// export default Signup;
