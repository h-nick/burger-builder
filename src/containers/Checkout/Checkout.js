import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './contactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
	checkoutContinueHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	checkoutCancelHandler = () => {
		this.props.history.goBack();
	}

	render() {
		// Redirect the user to the root page if the ingredients haven't loaded.
		/* This happens if the user access ./checkout/ URL directly since the ingredients wouldn't have
		loaded yet from the server. */
		let summary = <Redirect to='/'/>

		if(this.props.ingredients) {
			const purchasedRedirect = this.props.purchased ? <Redirect to='/'/> : null;

			summary = (
				<>
					{purchasedRedirect}
					<CheckoutSummary
					ingredients={this.props.ingredients}
					checkoutCanceled={this.checkoutCancelHandler}
					checkoutContinued={this.checkoutContinueHandler}
					/>

					<Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
				</>
			);
		}

		return summary;
	}
}

const mapStateToProps = (state) => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		purchased: state.orders.purchased
	}
}

export default connect(mapStateToProps)(Checkout);