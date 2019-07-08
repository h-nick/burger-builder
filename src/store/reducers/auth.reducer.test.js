import reducer from './auth.reducer';
import * as actionTypes from '../actions/types.actions';

describe('Auth reducer', () => {
	let initState;

	beforeEach(() => {
		initState = {
			token: null,
			id: null,
			error: null,
			loading: false,
			authRedirectPath: '/'
		}
	});

	it('Should return initial state on invalid action type', () => {
		expect(reducer(undefined, {})).toEqual(initState);
	});

	it('Should store the token upon log in', () => {
		expect(reducer(initState, { type: actionTypes.authSuccess, idToken: '1', userID: '1' }))
		.toEqual({
			token: '1',
			id: '1',
			error: null,
			loading: false,
			authRedirectPath: '/'
		});
	});
});