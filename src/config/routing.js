import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom'
import Signup from '../components/Signup'
import Home from '../components/Home'
import Signin from '../components/Signin'
import history from '../History'

export default class Routing extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Signup} />
                    <Route path="/home" component={Home} />
                    <Route path="/signin" component={Signin} />
                    
               </div>
            </Router>
        )
    }
}