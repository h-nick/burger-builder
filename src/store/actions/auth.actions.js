import * as actionTypes from './types.actions';
import axios from 'axios';

const authFailed = (error) => {
	return {
		type: actionTypes.authFailed,
		error
	}
}

const authStart = () => {
	return {
		type: actionTypes.authStart
	}
}

const authSuccess = (data) => {
	return {
		type: actionTypes.authSuccess,
		...data
	}
}

const authLogOut = () => {
	console.log('LOGOUT ACTION');
	return {
		type: actionTypes.authLogOut
	}
}

export const checkAuthTimeout = expTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(authLogOut());
		}, expTime * 1000)
	}
}

export const auth = (email, password, isSignUp) => {
	return dispatch => {
		dispatch(authStart());

		let URL = (
			'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?' +
			'key=AIzaSyCL3gCzQD-pSZ-8p91Afq3svWrfmV0uuJ4'
		);

		if(!isSignUp) {
			URL = (
				'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?' +
				'key=AIzaSyCL3gCzQD-pSZ-8p91Afq3svWrfmV0uuJ4'
			);
		}

		axios.post(URL, {
			email,
			password,
			returnSecureToken: true
		})
		.then(response => {
			console.log('[FIREBASE RESPONSE]', response);

			dispatch(authSuccess({
				idToken: response.data.idToken,
				userID: response.data.localId}
			));

			dispatch(checkAuthTimeout(response.data.expiresIn));
		})
		.catch(err => {
			console.log('[FIREBASE ERROR]', err);

			dispatch(authFailed(err.response.data.error));
		});
	}
}