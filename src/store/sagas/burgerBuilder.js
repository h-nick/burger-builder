import { put } from 'redux-saga/effects';
import * as actions from '../actions/index.actions';
import axios from 'axios';

export function* initIngredientsSaga() {
	try {
		const response = yield axios.get('https://burger-builder-520ab.firebaseio.com/ingredients.json');
		yield put(actions.setIngredients(response.data));
	}
	catch (_) {
		yield put(actions.fetchIngredientsFailed());
	}
}