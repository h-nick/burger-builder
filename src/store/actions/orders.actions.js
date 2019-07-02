import * as actionTypes from '../actions/types.actions';
import axios from '../../utils/axios_orders';

export const purchaseSuccessful = (id, orderData) => {
	return {
		type: actionTypes.purchaseSuccess,
		id,
		orderData
	}
}

export const purchaseFailed = error => {
	return {
		type: actionTypes.purchaseFailed,
		error
	}
}

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.purchaseBurgerStart
	}
}

export const purchaseBurger = (orderData, token) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		
		axios.post(`/orders.json?auth=${token}`, orderData)
		.then(response => {
			dispatch(purchaseSuccessful(response.data.name, orderData));
		})
		.catch(error => {
			dispatch(purchaseFailed(error));
		});
	}
}

export const purchaseInit = () => {
	return {
		type: actionTypes.purchaseInit
	}
}

export const fetchOrdersSuccess = orders => {
	return {
		type: actionTypes.fetchOrdersSuccess,
		orders
	}
}

export const fetchOrdersFailed = error => {
	return {
		type: actionTypes.fetchOrdersFailed,
		error
	}
}

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.fetchOrdersStart
	}
}

export const fetchOrders = (token, userID) => {
	return dispatch => {
		dispatch(fetchOrdersStart());

		axios.get(`/orders.json?auth=${token}&orderBy="userID"&equalTo="${userID}"`)
		.then(response => {
			const fetchedOrders = [];
			for(let key in response.data) {
				fetchedOrders.push({
					id: key,
					...response.data[key]
				});
			}

			dispatch(fetchOrdersSuccess(fetchedOrders));
		})
		.catch(error => {
			dispatch(fetchOrdersFailed(error));
		});
	}
}