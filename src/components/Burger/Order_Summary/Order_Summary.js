import React, { Component } from 'react';
import Button from '../../Ui/Button/Button';

export default class OrderSummary extends Component {
	constructor(props) {
		super(props);
		this.state = {  };
	}

	render() {
		// Ingredients is expected as an object, not an array. This transforms it into an array to create
		// several <li> elements.
		const ingredientSummary = Object.keys(this.props.ingredients)
		.map(elm => {
			return (<li key={elm}>
					<span style={{textTransform: 'capitalize'}}>{elm}</span>: {this.props.ingredients[elm]}
					</li>);
		});

		return (
			<>
				<h3>Your order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>
					{ingredientSummary}
				</ul>
				<h3><strong>Price: ${this.props.price.toFixed(2)}</strong></h3>
				<p>Continue to checkout?</p>
				<Button type={'Danger'} clicked={this.props.purchaseCanceled}>CANCEL</Button>
				<Button type={'Success'} clicked={this.props.purchaseContinued}>CONTINUE</Button>
			</>	
		);
	}
}