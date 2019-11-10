import { put } from 'redux-saga/effects';
import * as actionTypes from '../actions/types.actions';

export function* logoutSaga(action) {
	yield localStorage.removeItem('token');
	yield localStorage.removeItem('expirationDate');
	yield localStorage.removeItem('userID');

	yield put({
		type: actionTypes.authLogOut
	});
}