import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './contactData/ContactData';

class Checkout extends Component {
	constructor(props) {
		super(props);

		let ingredients = {};
		let price = 0;
		const query = new URLSearchParams(this.props.location.search);
		for(let param of query.entries()) {
			if(param[0] === 'price') {
				price = param[1];
			} else {
				ingredients[param[0]] = Number(param[1]);
			}
		}

		this.state = {
			ingredients: ingredients,
			totalPrice: price
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

				<Route path={this.props.match.path + '/contact-data'} render={() => (
					<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}/>
				)}/>
			</div>
		)
	}
}

export default Checkout;