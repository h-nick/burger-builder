import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './contactData/ContactData';
import { connect } from 'react-redux';

const Checkout = (props) => {
	const checkoutContinueHandler = () => {
	  props.history.replace('/checkout/contact-data');
	}

	const checkoutCancelHandler = () => {
    props.history.goBack();
  }

  let summary = <Redirect to='/'/>

  if(props.ingredients) {
    const purchasedRedirect = props.purchased && <Redirect to='/'/>;

    summary = (
      <>
        {purchasedRedirect}

        <CheckoutSummary
        ingredients={props.ingredients}
        checkoutCanceled={checkoutCancelHandler}
        checkoutContinued={checkoutContinueHandler}
        />

        <Route path={props.match.path + '/contact-data'} component={ContactData}/>
      </>
    );
  }
  
  return summary;
}

const mapStateToProps = (state) => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		purchased: state.orders.purchased
	}
}

export default connect(mapStateToProps)(Checkout);