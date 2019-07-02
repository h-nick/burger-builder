import * as actionTypes from './types.actions';
import axios from 'axios';

export const setAuthRedirectPath = path => {
	return {
		type: actionTypes.setAuthRedirectPath,
		path
	}
}

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

export const authLogOut = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userID');

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

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		const expirationDate = new Date(localStorage.getItem('expirationDate'));
		const userID = localStorage.getItem('userID');

		if(!token) dispatch(authLogOut());
		else {
			if(expirationDate > new Date()) {
				dispatch(authSuccess({idToken: token, userID}));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
			}
			else dispatch(authLogOut());
		}
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
			const expirationTime = new Date().getTime() + (response.data.expiresIn * 1000);

			localStorage.setItem('token', response.data.idToken);
			localStorage.setItem('expirationDate', new Date(expirationTime));
			localStorage.setItem('userID', response.data.localId);

			dispatch(authSuccess({
				idToken: response.data.idToken,
				userID: response.data.localId}
			));

			dispatch(checkAuthTimeout(response.data.expiresIn));
		})
		.catch(err => {
			dispatch(authFailed(err.response.data.error));
		});
	}
}