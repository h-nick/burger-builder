import * as actionTypes from '../actions/types.actions';
import { updateObject } from '../utils/updateObject';

const initState = {
	orders: [],
	loading: false,
	purchased: false
}

const purchaseSuccess = (state, action) => updateObject(state, {
	loading: false,
	orders: state.orders.concat({ id: action.id, ...action.orderData }),
	purchased: true
});

const fetchOrdersSuccess = (state, action) => updateObject(state, {
	orders: action.orders,
	loading: false
});

const reducer = (state = initState, action) => {
	switch(action.type) {
		case actionTypes.purchaseInit: return updateObject(state, { purchased: false });
		case actionTypes.purchaseBurgerStart: return updateObject(state, { loading: true });
		case actionTypes.purchaseSuccess: return purchaseSuccess(state, action);
		case actionTypes.purchaseFailed: return updateObject(state, { loading: false });
		case actionTypes.fetchOrdersStart: return updateObject(state, { loading: true });
		case actionTypes.fetchOrdersSuccess: return fetchOrdersSuccess(state, action);
		case actionTypes.fetchOrdersFailed: return updateObject(state, { loading: false });
		default: return state;
	}
}

export default reducer;