import * as actionTypes from './types.actions';

export const setAuthRedirectPath = path => {
	return {
		type: actionTypes.setAuthRedirectPath,
		path
	}
}

export const authFailed = (error) => {
	return {
		type: actionTypes.authFailed,
		error
	}
}

export const authStart = () => {
	return {
		type: actionTypes.authStart
	}
}

export const authSuccess = (data) => {
	return {
		type: actionTypes.authSuccess,
		...data
	}
}

export const logoutSucceed = () => {
	return {
		type: actionTypes.authLogOut
	}
}

export const authLogOut = () => {
	return {
		type: actionTypes.authInitiateLogout
	}
}

export const checkAuthTimeout = expTime => {
	return {
		type: actionTypes.authCheckTimeout,
		expTime
	}
}

export const authCheckState = () => {
	return {
		type: actionTypes.authCheckState
	}
}

export const auth = (email, password, isSignUp) => {
	return {
		type: actionTypes.auth,
		email,
		password,
		isSignUp
	}
}