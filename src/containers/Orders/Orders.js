import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../utils/axios_orders';
import withErrorHandler from '../../components/HOC/Error_Handler/Error_Handler';
import * as actions from '../../store/actions/index.actions';
import { connect } from 'react-redux';
import Spinner from '../../components/Ui/Spinner/Spinner';

class Orders extends Component {

	componentDidMount() {
		this.props.fetchOrders(this.props.token);
	}

	render() {
		let orders = <Spinner/>;

		if(!this.props.loading) {
			orders = (
				this.props.orders.map(order => (
					<Order
					key={order.id}
					ingredients={order.ingredients}
					price={order.price}
					/>
				))
			);
		}

		return (
			<div>
				{orders}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		orders: state.orders.orders,
		loading: state.orders.loading,
		token: state.auth.token
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchOrders: (token) => dispatch(actions.fetchOrders(token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
