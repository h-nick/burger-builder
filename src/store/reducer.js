import * as actionTypes from './actions';

const initState = {
	ingredients: {
		cheese: 0,
		bacon: 0,
		meat: 0,
		salad: 0
	},
	totalPrice: 5
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

		default: return state;
	}
}

export default reducer;