import * as actionTypes from '../actions/types.actions';
import axios from '../../utils/axios_orders';

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
	return dispatch => {
		axios.get('https://burger-builder-520ab.firebaseio.com/ingredients.json')
		.then(response => {
			dispatch(setIngredients(response.data));
		})
		.catch(_ => {
			dispatch(fetchIngredientsFailed());
		})
	}
}