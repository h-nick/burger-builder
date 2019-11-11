import { logoutSaga, checkAuthTimeoutSaga, authSaga, authCheckStateSaga } from './auth';
import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/types.actions';

export function* watchAuth() {
	yield takeEvery(actionTypes.authInitiateLogout, logoutSaga);
	yield takeEvery(actionTypes.authCheckTimeout, checkAuthTimeoutSaga);
	yield takeEvery(actionTypes.auth, authSaga);
	yield takeEvery(actionTypes.authCheckState, authCheckStateSaga);
}