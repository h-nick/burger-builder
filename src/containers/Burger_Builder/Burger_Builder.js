import React from 'react';
import ErrorHandler from '../../components/HOC/Error_Handler/Error_Handler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/Build_Controls/Build_Controls';
import Modal from '../../components/Ui/Modal/Modal';
import Spinner from '../../components/Ui/Spinner/Spinner';
import OrderSummary from '../../components/Burger/Order_Summary/Order_Summary';
import axios from '../../utils/axios_orders';

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
			ingredients: null,
			totalPrice: 5,
			purchasable: false,
			purchasing: false,
			loading: false
		};
	}

	componentDidMount() {
		axios.get('https://react-burger-udemy-nhd.firebaseio.com/ingredients.json')
		.then(response => {
			this.setState({ ingredients: response.data});
		})
		.catch(error => {
			console.log(error);
		})
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
		// The query params here are hardcoded (as long as we don't add more ingredients, this will work).
		// Check lecture 252 (Passing Ingredients via Query Params). There's a more proper way to pass query
		// params using a scalable method based on encodeURIComponent.
		this.props.history.push({
			pathname: '/checkout',
			search: `?price=${this.state.totalPrice}&bacon=${this.state.ingredients.bacon}&cheese=${this.state.ingredients.cheese}&meat=${this.state.ingredients.meat}&salad=${this.state.ingredients.salad}`
		});
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};

		for(let key in disabledInfo) {
			// {salad: false, meat: true, ···}
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = null;
		let burger = <Spinner/>;
		
		if(this.state.ingredients) {
			orderSummary = (
				<OrderSummary 
				ingredients={this.state.ingredients}
				price={this.state.totalPrice}
				purchaseCanceled={this.purchaseCancelHandler}
				purchaseContinued={this.purchaseContinueHandler}
				/>
			);

			burger = (
				<>
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

		if(this.state.loading) {
			orderSummary = <Spinner/>
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

export default ErrorHandler(BurgerBuilder, axios);