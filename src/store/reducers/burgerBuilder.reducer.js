import * as actionTypes from '../actions/types.actions';
<<<<<<< HEAD
import { updateObject } from '../utils/updateObject';

const basePrice = 5;

const initState = {
	ingredients: null,
	totalPrice: basePrice,
=======

const initState = {
	ingredients: null,
	totalPrice: 5,
>>>>>>> 94affa979360d2e0e2a8d72a8e4e45c746594b27
	error: false
}

const ingredientPrices = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.5
};

<<<<<<< HEAD
const addIngredient = (state, action) => {
	const updatedIngredients = updateObject(
		state.ingredients,
		{ [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
	);

	return updateObject(state, {
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice + ingredientPrices[action.ingredientName]
	});
}

const removeIngredient = (state, action) => {
	const updatedIngredients = updateObject(
		state.ingredients,
		{ [action.ingredientName]: state.ingredients[action.ingredientName] - 1}
	);

	return updateObject(state, {
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice + ingredientPrices[action.ingredientName]
	});
}

const setIngredients = (state, action) => updateObject(state, {
	ingredients: action.ingredients,
	totalPrice: basePrice,
	error: false
});

const fetchIngredientsFailed = (state, action) => updateObject(state, {
	totalPrice: basePrice,
	error: true
});

const reducer = (state = initState, action) => {
	switch(action.type) {
		case actionTypes.addIngredient: return addIngredient(state, action);
		case actionTypes.removeIngredient: return removeIngredient(state, action);
		case actionTypes.setIngredients: return setIngredients(state, action);
		case actionTypes.fetchIngredientsFailed: return fetchIngredientsFailed(state, action);
=======
const reducer = (state = initState, action) => {
	switch(action.type) {
		case actionTypes.addIngredient: return {
			...state,
			totalPrice: state.totalPrice + ingredientPrices[action.ingredientName],
			ingredients: {
				...state.ingredients,
				[action.ingredientName]: state.ingredients[action.ingredientName] + 1 // ES6 syntax.
			}
		}
		
		case actionTypes.removeIngredient: return {
			...state,
			totalPrice: state.totalPrice - ingredientPrices[action.ingredientName],
			ingredients: {
				...state.ingredients,
				[action.ingredientName]: state.ingredients[action.ingredientName] - 1 // ES6 syntax.
			}
		}

		case actionTypes.setIngredients: return {
			...state,
			ingredients: action.ingredients,
			error: false
		}

		case actionTypes.fetchIngredientsFailed: return {
			...state,
			error: true
		}

>>>>>>> 94affa979360d2e0e2a8d72a8e4e45c746594b27
		default: return state;
	}
}

export default reducer;