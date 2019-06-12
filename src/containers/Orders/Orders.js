import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../utils/axios_orders';
import withErrorHandler from '../../components/HOC/Error_Handler/Error_Handler';

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
			</div>
		);
	}
}

export default withErrorHandler(Orders, axios);