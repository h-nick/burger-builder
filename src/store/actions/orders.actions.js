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
	return {
		type: actionTypes.purchaseBurger,
		orderData,
		token
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
	return {
		type: actionTypes.fetchOrders,
		token,
		userID
	}
}