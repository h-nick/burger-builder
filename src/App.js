import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import asyncComponent from '../src/components/HOC/Async_Component/Async_Component';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index.actions';
const AsyncBurgerBuilder = asyncComponent(() => import('./containers/Burger_Builder/Burger_Builder'));
const AsyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const AsyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const AsyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));
const AsyncLogOut = asyncComponent(() => import('./containers/Auth/LogOut/LogOut'));

class App extends Component {
	componentDidMount() {
		this.props.tryAutoSignIn();
	}

	render() {
		let routes = (
			<Switch>
				<Route path='/auth' component={AsyncAuth}/>
				<Route path="/" exact component={AsyncBurgerBuilder}/>
				<Redirect to='/'/>
			</Switch>
		);

		if(this.props.isAuth) routes = (
			<Switch>
				<Route path='/auth' component={AsyncAuth}/> {/* Kept for redirection inside Auth component. */}
				<Route path='/orders' component={AsyncOrders}/>
				<Route path="/checkout" component={AsyncCheckout}/>
				<Route path='/logout' component={AsyncLogOut}/>
				<Route path='/' exact component={AsyncBurgerBuilder}/>
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
