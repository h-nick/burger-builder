import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../utils/axios_orders';
import withErrorHandler from '../../components/HOC/Error_Handler/Error_Handler';
<<<<<<< HEAD
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
=======

class Orders extends Component {
	state = {
		orders: [], // move to Redux with async code (HTTP requests).
		loading: true
	}

	componentDidMount() {
		axios.get('/orders.json')
		.then(response => {
			const fetchedOrders = [];
			for(let key in response.data) {
				fetchedOrders.push({
					id: key,
					...response.data[key]
				});
			}

			this.setState({ loading: false, orders: fetchedOrders });
		})
		.catch(error => {
			this.setState({ loading: false });
		})
	}

	render() {
		return (
			<div>
			{this.state.orders.map(order => (
				<Order
				key={order.id}
				ingredients={order.ingredients}
				price={order.price}
				/>
			))}
>>>>>>> 94affa979360d2e0e2a8d72a8e4e45c746594b27
			</div>
		);
	}
}

<<<<<<< HEAD
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
=======
export default withErrorHandler(Orders, axios);
>>>>>>> 94affa979360d2e0e2a8d72a8e4e45c746594b27
