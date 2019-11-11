import * as actionTypes from '../actions/types.actions';

export const addIngredient = (ingredientName) => {
	return {
		type: actionTypes.addIngredient,
		ingredientName
	}
}

export const removeIngredient = (ingredientName) => {
	return {
		type: actionTypes.removeIngredient,
		ingredientName
	}
}

export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.setIngredients,
		ingredients
	}
}

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.fetchIngredientsFailed
	}
}

export const initIngredients = () => {
	return {
		type: actionTypes.initIngredients
	}
}