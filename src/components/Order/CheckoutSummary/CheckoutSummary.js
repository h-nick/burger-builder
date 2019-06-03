import Burger from '../../Burger/Burger';
import Button from '../../Ui/Button/Button';
import Classes from './CheckoutSummary.css';
import React from 'react';

const CheckoutSummary = (props) => {
	return(
		<div className={Classes.CheckoutSummary}>
			<h1>We hope it tastes well!</h1>
			<div style={{width: '100%', margin: 'auto'}}>
				<Burger ingredients={props.ingredients}/>
			</div>
			<Button type="Danger" clicked={props.checkoutCanceled}>CANCEL</Button>
			<Button type="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
		</div>
	)
}

export default CheckoutSummary;