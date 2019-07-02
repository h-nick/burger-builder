import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/Burger_Builder/Burger_Builder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import LogOut from './containers/Auth/LogOut/LogOut';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index.actions';

class App extends Component {
	componentDidMount() {
		this.props.tryAutoSignIn();
	}

	render() {
		let routes = (
			<Switch>
				<Route path='/auth' component={Auth}/>
				<Route path="/" exact component={BurgerBuilder}/>
				<Redirect to='/'/>
			</Switch>
		);

		if(this.props.isAuth) routes = (
			<Switch>
				<Route path='/auth' component={Auth}/> {/* Kept for redirection inside Auth component. */}
				<Route path='/orders' component={Orders}/>
				<Route path="/checkout" component={Checkout}/>
				<Route path='/logout' component={LogOut}/>
				<Route path='/' exact component={BurgerBuilder}/>
				<Redirect to='/'/>
			</Switch>
		);

		return (
			<div>
				<Layout>
					{routes}
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		tryAutoSignIn: () => dispatch(actions.authCheckState())
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
