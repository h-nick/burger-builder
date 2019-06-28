import React from 'react';
import ErrorHandler from '../../components/HOC/Error_Handler/Error_Handler';
import axios from '../../utils/axios_orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/Build_Controls/Build_Controls';
import Modal from '../../components/Ui/Modal/Modal';
import Spinner from '../../components/Ui/Spinner/Spinner';
import OrderSummary from '../../components/Burger/Order_Summary/Order_Summary';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index.actions';

class BurgerBuilder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			purchasing: false,
			loading: false
		};
	}

	componentDidMount() {
		this.props.initIngredients();
	}

	purchaseHandler = () => {
		this.setState({
			purchasing: true
		});
	}

	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false
		});
	}

	updatePurchaseState = () => {
		// We use a parameter instead of reading the state directly. Remember that the state is not
		// updated live.

		const sum = Object.keys(this.props.ingredients)
		.map(elm => {
			return this.props.ingredients[elm];
		})
		.reduce((sum, elm) => {
			return sum + elm;
		}, 0);

		return sum > 0;
	}

	purchaseContinueHandler = () => {
		this.props.purchaseInit();
		this.props.history.push('/checkout');
	}

	render() {
		const disabledInfo = {
			...this.props.ingredients
		};

		for(let key in disabledInfo) {
			// {salad: false, meat: true, ···}
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = null;
		let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
		
		if(this.props.ingredients) {
			orderSummary = (
				<OrderSummary
				ingredients={this.props.ingredients}
				price={this.props.totalPrice}
				purchaseCanceled={this.purchaseCancelHandler}
				purchaseContinued={this.purchaseContinueHandler}
				/>
			);

			burger = (
				<>
					<Burger ingredients={this.props.ingredients}/>
					<div>
						<BuildControls 
						totalPrice={this.props.totalPrice}
						ingredientAdded={this.props.addIngredient}
						ingredientRemoved={this.props.removeIngredient}
						disabled={disabledInfo}
						purchasable={this.updatePurchaseState()} // We call it directly. We need the result.
						ordered={this.purchaseHandler}
						/>
					</div>
				</>
			);
		}

		return(
			<>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
		removeIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
		initIngredients: () => dispatch(actions.initIngredients()),
		purchaseInit: () => dispatch(actions.purchaseInit())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));