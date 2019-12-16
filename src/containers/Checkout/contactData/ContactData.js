import React, { useState } from 'react';
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

const ContactData = (props) => {
  const helper = (element, type, placeholder, extraRules) => {
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

  const [orderForm, setOrderForm] = useState({
    name: helper('input', 'text', 'Your name.'),
    street: helper('input', 'text', 'Your street address.'),
    zipCode: helper('input', 'text', 'Your ZIP code.', { minLength: 4, maxLength: 6}),
    country: helper('input', 'text', 'Your country.'),
    email: helper('input', 'email', 'Your email.'),
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
	});
  
  const [validForm, setValidForm] = useState(false);

  const orderHandler = (event) => {
		event.preventDefault();

		// Thanks to two-way binding, all our form data is already in the state. We simply have to map
		// keys to values.
		const formData = {};
		for(let formElement in orderForm) {
			formData[formElement] = orderForm[formElement].value;
		}

		const order = {
			ingredients: props.ingredients,
			// On production this should be calculated on the server-side to avoid tampering.
			price: props.totalPrice,
			orderData: formData,
			userID: props.userID
		};

		props.purchaseBurger(order, props.token);
	}

	const inputChangedHandler = (event, inputID) => {
		const updatedFormElement = updateObject(orderForm[inputID], {
			value: event.target.value,
			valid: checkValidation(
				event.target.value,
				orderForm[inputID].validation
			),
			touched: true
		});

		const updatedOrderForm = updateObject(orderForm, {
			[inputID]: updatedFormElement
		});

		let formIsValid = true;
		for(let key in updatedOrderForm) {
			formIsValid = updatedOrderForm[key].valid && formIsValid;
		}

    setOrderForm(updatedOrderForm);
    setValidForm(formIsValid);
	}

  const formElements = [];

  for(let key in orderForm) {
    formElements.push({
      id: key,
      config: orderForm[key]
    })
  }

  let form = (
    <form onSubmit={orderHandler}>
      {formElements.map(e => (
        <Input
        key = {e.id}
        elementType = {e.config.elementType}
        value = {e.config.value}
        config = {e.config.elementConfig}
        changed = {(event) => inputChangedHandler(event, e.id)}
        invalid = {!e.config.valid}
        shouldValidate = {e.config.validation}
        touched = {e.config.touched}
        />
      ))}
      <Button
      type='Success'
      clicked={orderHandler}
      disabled={!validForm}>
        Order
      </Button>
    </form>
  )
  
  if(props.loading) form = <Spinner/>

  return (
    <div className={Classes.ContactData}>
      <h4>Enter your contact data</h4>
      {form}
    </div>
  );
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
