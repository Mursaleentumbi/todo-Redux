import React from 'react';
import { connect } from 'react-redux';
import { signinAction } from '../actions/action'

class Signin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
    }

    onChangeHandler = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }


    signin() {
        let user = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.signIn(user);
    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="text" onChange={this.onChangeHandler.bind(this)} name="email" className="form-control-plaintext" id="staticEmail" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" onChange={this.onChangeHandler.bind(this)} name="password" className="form-control" id="inputPassword" placeholder="Password" />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.signin.bind(this)}>Submit</button>

                    </div>
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
        // changeUserName: ()=>{dispatch(changeUserName())}
        signIn: (users)=>{
            dispatch(signinAction(users))
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Signin);