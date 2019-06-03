import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
	constructor(props) {
		super(props);

		let ingredients = {};
		const query = new URLSearchParams(this.props.location.search);
		for(let param of query.entries()) {
			ingredients[param[0]] = Number(param[1]);
		}

		this.state = {
			ingredients: ingredients
		};
	}

	checkoutContinueHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	checkoutCancelHandler = () => {
		this.props.history.goBack();
	}

	render() {
		console.log(this.state);
		return(
			<div>
				<CheckoutSummary
				ingredients={this.state.ingredients}
				checkoutCanceled={this.checkoutCancelHandler}
				checkoutContinued={this.checkoutContinueHandler}
				/>
			</div>
		)
	}
}

export default Checkout;