import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index.actions';
import axios from 'axios';

export function* logoutSaga(action) {
	yield localStorage.removeItem('token');
	yield localStorage.removeItem('expirationDate');
	yield localStorage.removeItem('userID');

	yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
	yield delay(action.expTime * 1000);
	yield put(actions.authLogOut());
}

export function* authSaga(action) {
	yield put(actions.authStart());

	const authData = {
		email: action.email,
		password: action.password,
		returnSecureToken: true
	}

	let URL = (
		'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?' +
		'key=AIzaSyCL3gCzQD-pSZ-8p91Afq3svWrfmV0uuJ4'
	);

	if (!action.isSignUp) {
		URL = (
			'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?' +
			'key=AIzaSyCL3gCzQD-pSZ-8p91Afq3svWrfmV0uuJ4'
		);
	}

	try {
		const response = yield axios.post(URL, authData);

		const expirationTime = yield new Date().getTime() + (response.data.expiresIn * 1000);

		yield localStorage.setItem('token', response.data.idToken);
		yield localStorage.setItem('expirationDate', new Date(expirationTime));
		yield localStorage.setItem('userID', response.data.localId);

		yield put(actions.authSuccess({
			idToken: response.data.idToken,
			userID: response.data.localId
		}));

		yield put(actions.checkAuthTimeout(response.data.expiresIn));
	}
	catch (error) {
		yield put(actions.authFailed(error.response.data.error));
	}
}

export function* authCheckStateSaga(action) {
	const token = yield localStorage.getItem('token');
	const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
	const userID = yield localStorage.getItem('userID');

	if (!token) yield put(actions.authLogOut());
	else {
		if (expirationDate > new Date()) {
			yield put(actions.authSuccess({ idToken: token, userID }));
			yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
		}
		else yield put(actions.authLogOut());
	}

}