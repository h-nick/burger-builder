import * as actionTypes from '../actions/types.actions';
import { updateObject } from '../utils/updateObject';


const initState = {
	token: null,
	id: null,
	error: null,
	loading: false,
	authRedirectPath: '/'
}

const authSuccess = (state, action) => {
	const updatedState = {
		token: action.idToken,
		id: action.userID,
		error: null,
		loading: false
	}

	return updateObject(state, updatedState);
}

const reducer = (state = initState, action) => {
	switch(action.type) {
		case actionTypes.authFailed: return updateObject(state, { error: action.error, loading: false });
		case actionTypes.authStart: return updateObject(state, { error: null, loading: true });
		case actionTypes.authSuccess: return authSuccess(state, action);
		case actionTypes.authLogOut: return updateObject(state, { token: null, id: null });
		case actionTypes.setAuthRedirectPath: return updateObject(state, { authRedirectPath: action.path });
		default: return state;
	}
}

export default reducer;