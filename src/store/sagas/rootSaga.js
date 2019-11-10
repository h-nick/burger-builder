import { logoutSaga } from './auth';
import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/types.actions';

export function* watchAuth() {
	yield takeEvery(actionTypes.authInitiateLogout, logoutSaga);
}