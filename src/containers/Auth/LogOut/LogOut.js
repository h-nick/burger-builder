import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index.actions';

class LogOut extends Component {
	componentDidMount() {
		this.props.logOut();
	}

	render() {
		return (
			<Redirect to='/'/>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logOut: () => dispatch(actions.authLogOut())
	}
}

export default connect(null, mapDispatchToProps)(LogOut);