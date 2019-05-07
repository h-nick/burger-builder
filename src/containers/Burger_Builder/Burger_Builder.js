import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/Build_Controls/Build_Controls';
import Modal from '../../components/Ui/Modal/Modal';
import OrderSummary from '../../components/Burger/Order_Summary/Order_Summary';

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.5
};

class BurgerBuilder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ingredients: {
				salad: 0,
				bacon: 0,
				cheese: 0,
				meat: 0
			},
			totalPrice: 5,
			purchasable: false,
			purchasing: false
		};
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

	updatePurchaseState = (allIngredients) => {
		// We use a parameter instead of reading the state directly. Remember that the state is not
		// updated live.

		const sum = Object.keys(allIngredients)
		.map(elm => {
			return allIngredients[elm];
		})
		.reduce((sum, elm) => {
			return sum + elm;
		}, 0);

		this.setState({
			purchasable: sum > 0
		});
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;

		// Done this way so the state is not mutated directly as required by the React standard.
		const updatedIngredients = {
			...this.state.ingredients
		};

		updatedIngredients[type] = updatedCount;

		const priceAddition = INGREDIENT_PRICES[type];
		const newPrice = this.state.totalPrice + priceAddition;

		this.setState({
			ingredients: updatedIngredients,
			totalPrice: newPrice
		});

		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if(oldCount > 0) {
			const updatedCount = oldCount - 1;
	
			const updatedIngredients = {
				...this.state.ingredients
			};
	
			updatedIngredients[type] = updatedCount;
	
			const priceDeduction = INGREDIENT_PRICES[type];
			const newPrice = this.state.totalPrice - priceDeduction;
	
			this.setState({
				ingredients: updatedIngredients,
				totalPrice: newPrice
			});

			this.updatePurchaseState(updatedIngredients);
		}
	}



	purchaseContinueHandler = () => {
		alert('You continued!');
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};

		for(let key in disabledInfo) {
			// {salad: false, meat: true, ···}
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		return(
			<>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					<OrderSummary 
					ingredients={this.state.ingredients}
					price={this.state.totalPrice}
					purchaseCanceled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					/>
				</Modal>
				<Burger ingredients={this.state.ingredients}/>
				<div>
					<BuildControls 
					totalPrice={this.state.totalPrice}
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					purchasable={this.state.purchasable}
					ordered={this.purchaseHandler}
					/>
				</div>
			</>
		);
	}
}

export default BurgerBuilder;