import React from 'react';
import Classes from './Order.css';

const Order = (props) => {
	const ingredients = [];

	// This is a similar logic to the one implemented in the Burger component.
	for(let ingredientName in props.ingredients) {
		ingredients.push({
			name: ingredientName,
			amount: props.ingredients[ingredientName]
		});
	}

	const ingredientOutput = ingredients.map(ingredient => {
		return <span key={ingredient.name}>{ingredient.name} ({ingredient.amount})</span>
	});

	return (
		<div className={Classes.Order}>
			<p>Ingredients: {ingredientOutput}</p>
			<p>Price: <strong>${Number(props.price).toFixed(2)}</strong></p>
		</div>		
	);
}

export default Order;