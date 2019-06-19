import * as actionTypes from '../actions/types.actions';

const initState = {
	ingredients: null,
	totalPrice: 5,
	error: false
}

const ingredientPrices = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.5
};

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

		default: return state;
	}
}

export default reducer;