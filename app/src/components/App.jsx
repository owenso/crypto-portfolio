import React, { Component } from 'react';
import { connect } from 'react-redux';
import Landing from './login/Landing';
import Home from './home/Home';
const io = require('socket.io-client');
const socket = io('localhost:3001');

@connect((store) => {
    return {
    };
})

export default class App extends Component {

	loggedIn(){
		return false;
	}

    componentDidMount() {
    }

    render() {
        const userLoading = false;
        
        if (!this.loggedIn()) return <Landing/>;
        // else if (userLoading) return <Spinner />;
        else if (this.LoggedIn()) return <Home />;
        // else return (<Spinner />);
    }
}
