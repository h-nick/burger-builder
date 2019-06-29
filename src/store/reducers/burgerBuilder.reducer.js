import * as actionTypes from '../actions/types.actions';
import { updateObject } from '../utils/updateObject';

const basePrice = 5;

const initState = {
	ingredients: null,
	totalPrice: basePrice,
	error: false,
	building: false
}

const ingredientPrices = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.5
};

const addIngredient = (state, action) => {
	const updatedIngredients = updateObject(
		state.ingredients,
		{ [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
	);

	return updateObject(state, {
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice + ingredientPrices[action.ingredientName],
		building: true
	});
}

const removeIngredient = (state, action) => {
	const updatedIngredients = updateObject(
		state.ingredients,
		{ [action.ingredientName]: state.ingredients[action.ingredientName] - 1}
	);

	return updateObject(state, {
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice + ingredientPrices[action.ingredientName],
		building: true
	});
}

const setIngredients = (state, action) => updateObject(state, {
	ingredients: action.ingredients,
	totalPrice: basePrice,
	error: false,
	building: false
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
		default: return state;
	}
}

export default reducer;