import React, { Component } from 'react';
import Button from '../../../components/Ui/Button/Button';
import updateObject from '../../../utils/updateObject';
import Classes from './ContactData.css';
import axios from '../../../utils/axios_orders';
import Spinner from '../../../components/Ui/Spinner/Spinner';
import Input from '../../../components/Ui/Input/Input';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ErrorHandler from '../../../components/HOC/Error_Handler/Error_Handler';
import * as actions from '../../../store/actions/index.actions';
import checkValidation from '../../../utils/checkValidation';

class ContactData extends Component {
	helper = (element, type, placeholder, extraRules) => {
		return(
			{
				elementType: element,
				elementConfig: {
					type: type,
					placeholder: placeholder
				},
				value: '',
				validation: {
					required: true,
					...extraRules
				},
				valid: false,
				touched: false
			}
		);
	}

	state = {
		orderForm: {
			name: this.helper('input', 'text', 'Your name.'),
			street: this.helper('input', 'text', 'Your street address.'),
			zipCode: this.helper('input', 'text', 'Your ZIP code.', { minLength: 4, maxLength: 6}),
			country: this.helper('input', 'text', 'Your country.'),
			email: this.helper('input', 'email', 'Your email.'),
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fastest'},
						{value: 'cheapest', displayValue: 'Cheapest'}
					]
				},
				value: 'fastest',
				validation: {},
				valid: true
			}
		},
		validForm: false
	}

	orderHandler = (event) => {
		event.preventDefault();

		// Thanks to two-way binding, all our form data is already in the state. We simply have to map
		// keys to values.
		const formData = {};
		for(let formElement in this.state.orderForm) {
			formData[formElement] = this.state.orderForm[formElement].value;
		}

		const order = {
			ingredients: this.props.ingredients,
			// On production this should be calculated on the server-side to avoid tampering.
			price: this.props.totalPrice,
			orderData: formData,
			userID: this.props.userID
		};

		this.props.purchaseBurger(order, this.props.token);
	}

	inputChangedHandler = (event, inputID) => {
		const updatedFormElement = updateObject(this.state.orderForm[inputID], {
			value: event.target.value,
			valid: checkValidation(
				event.target.value,
				this.state.orderForm[inputID].validation
			),
			touched: true
		});

		const updatedOrderForm = updateObject(this.state.orderForm, {
			[inputID]: updatedFormElement
		});

		let formIsValid = true;
		for(let key in updatedOrderForm) {
			formIsValid = updatedOrderForm[key].valid && formIsValid;
		}

		this.setState({ orderForm: updatedOrderForm, validForm: formIsValid });
	}

	render() {
		const formElements = [];

		for(let key in this.state.orderForm) {
			formElements.push({
				id: key,
				config: this.state.orderForm[key]
			})
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElements.map(e => (
					<Input
					key = {e.id}
					elementType = {e.config.elementType}
					value = {e.config.value}
					config = {e.config.elementConfig}
					changed = {(event) => this.inputChangedHandler(event, e.id)}
					invalid = {!e.config.valid}
					shouldValidate = {e.config.validation}
					touched = {e.config.touched}
					/>
				))}
				<Button
				type='Success'
				clicked={this.orderHandler}
				disabled={!this.state.validForm}>
					Order
				</Button>
			</form>
		)
		
		if(this.props.loading) form = <Spinner/>

		return (
			<div className={Classes.ContactData}>
				<h4>Enter your contact data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		loading: state.orders.loading,
		token: state.auth.token,
		userID: state.auth.id
	}
}

const mapDispatchToProps = dispatch => {
	return {
		purchaseBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ErrorHandler(ContactData, axios)));
