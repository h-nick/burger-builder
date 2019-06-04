import React, { Component } from 'react';
import Button from '../../../components/Ui/Button/Button';
import Classes from './ContactData.css';
import axios from '../../../utils/axios_orders';
import Spinner from '../../../components/Ui/Spinner/Spinner';
import { withRouter } from 'react-router-dom';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			zipCode: ''
		},
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();

		this.setState({ loading: true });

		const order = {
			ingredients: this.props.ingredients,
			// On production this should be calculated on the server-side to avoid tampering.
			price: this.props.price,
			customer: {
				name: 'Max',
				address: {
					street: 'Johnson 23233',
					zipCode: '67899',
					country: 'USA'
				},
				email: 'test@test.com'
			},
			deliveryMethod: 'fastest'
		};

		console.log(order);

		axios.post('/orders.json', order) // Done like this as especified by Firebase. Check Lecture #208.
		.then(response => {
			this.setState({ loading: false });

			this.props.history.push('/');
		})
		.catch(error => {
			console.log(error);
			this.setState({ loading: false });
		});
	}

	render() {
		let form = (
			<form>
				<input type='text' name='name' placeholder='Your name'/>
				<input type='email' name='email' placeholder='Your email'/>
				<input type='text' name='street' placeholder='Your street'/>
				<input type='text' name='zipCode' placeholder='Your ZIP Code'/>
				<Button type='Success' clicked={this.orderHandler}>Order</Button>
			</form>
		)
		if(this.state.loading) form = <Spinner/>

		return (
			<div className={Classes.ContactData}>
				<h4>Enter your contact data</h4>
				{form}
			</div>
		);
	}
}

export default withRouter(ContactData);