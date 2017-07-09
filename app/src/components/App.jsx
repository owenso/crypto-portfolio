import React, { Component } from 'react';
import { connect } from 'react-redux';
import Landing from './login/Landing';
import Home from './home/Home';
import priceUpdates from '../lib/priceUpdates';

@connect((store) => {
    return {
    };
})

export default class App extends Component {

	loggedIn(){
		return false;
	}

    componentWillMount() {
        const {dispatch} = this.props;
        priceUpdates(dispatch);
    }

    render() {
        const userLoading = false;
        
        if (!this.loggedIn()) return <Landing/>;
        // else if (userLoading) return <Spinner />;
        else if (this.LoggedIn()) return <Home />;
        // else return (<Spinner />);
    }
}
