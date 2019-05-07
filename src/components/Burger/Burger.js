import React from 'react';
import BurgerIngredient from './Burger_Ingredient/Burger_Ingredient';
import Classes from './Burger.css';

const Burger = (props) => {
	/* Object.keys() creates an array with the keys of prop.ingredients.
	 * Like this [cheese, bacon, ...]
	 * Then we map over that array and create a new one using
	 * return [...Array(props.ingredients[key])]
	 * This gets the numeric value of the object we're passing as props (cheese is 3 for example)
	 * and then creates a new array with that value [3]. Since we're using Array() the array is 3
	 * slots long, and since we're using the spread operator, all the slots will be occupied by
	 * the same value [3, 3, 3].
	 * We then map over this array, we ignore the first value (the actual value, 3 in this case)
	 * and only use the index. This is to add the unique key to the element as required by React.
	 * In the end we return a <BurgerIngredient/> component with its unique key and type "key"
	 * which is cheese in this case. Since we're mapping for that same ammount of keys [3, 3, 3],
	 * we get 3 <BurgerIngredients>.
	 */

	let transformedIngredients = Object.keys(props.ingredients).map(key => {
		return [...Array(props.ingredients[key])].map((_, i) => {
			return <BurgerIngredient key={key + i} type={key}/>;
		})
	})
	.reduce((arr, el) => {
		return arr.concat(el);
	}, []);

	/* Since even if we don't pass values, we'll get an array of empty arrays, there's no easy
	 * way to check if we don't have ingredients. We'll use .reduce() to ensure that if the
	 * array is full of empty arrays, we'll simply get a single empty array, thus allowing us
	 * to check if we didn't input any ingredient.
	 */

	if(transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients.</p>;
	}
	
	return(
		<div className={Classes.Burger}>
			<BurgerIngredient type="bread-top"/>
				{transformedIngredients}
			<BurgerIngredient type="bread-bottom"/>
		</div>
	);
}

export default Burger;