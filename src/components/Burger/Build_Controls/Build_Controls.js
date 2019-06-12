import React from 'react';
import Classes from './Build_Controls.css'
import BuildControl from './Build_Control/Build_Control';

// Must be the same to the ones on the BurgerIngredients component.
const controls = [
	{label: 'Salad', type: 'salad'},
	{label: 'Bacon', type: 'bacon'},
	{label: 'Cheese', type: 'cheese'},
	{label: 'Meat', type: 'meat'},
];

const BuildControls = (props) => {
	return(
		<div className={Classes.BuildControls}>
			<p>Current price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
			
			{controls.map(elm => {
				return(
					<BuildControl
					key={elm.label} label={elm.label} 
					added={() => props.ingredientAdded(elm.type)}
					removed={() => props.ingredientRemoved(elm.type)}
					disabled={props.disabled[elm.type]}
					/>
				);
			})}

			<button
			className={Classes.OrderButton}
			disabled={!props.purchasable}
			onClick={props.ordered}>ORDER NOW</button>
		</div>
	);
}

export default BuildControls;