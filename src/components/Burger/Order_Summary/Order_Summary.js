import React from 'react';
import Button from '../../Ui/Button/Button';

const OrderSummary = (props) => {
	// Ingredients is expected as an object, not an array. This transforms it into an array to create
	// several <li> elements.
	const ingredientSummary = Object.keys(props.ingredients)
	.map(elm => {
		return (<li key={elm}>
				<span style={{textTransform: 'capitalize'}}>{elm}</span>: {props.ingredients[elm]}
				</li>);
	});

	return(
		<>
			<h3>Your order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>
				{ingredientSummary}
			</ul>
			<h3><strong>Price: ${props.price.toFixed(2)}</strong></h3>
			<p>Continue to checkout?</p>
			<Button type={'Danger'} clicked={props.purchaseCanceled}>CANCEL</Button>
			<Button type={'Success'} clicked={props.purchaseContinued}>CONTINUE</Button>
		</>
	);
}

export default OrderSummary;