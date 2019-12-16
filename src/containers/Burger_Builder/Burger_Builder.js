import React, { useState, useEffect, useCallback } from 'react';
import ErrorHandler from '../../components/HOC/Error_Handler/Error_Handler';
import axios from '../../utils/axios_orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/Build_Controls/Build_Controls';
import Modal from '../../components/Ui/Modal/Modal';
import Spinner from '../../components/Ui/Spinner/Spinner';
import OrderSummary from '../../components/Burger/Order_Summary/Order_Summary';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index.actions';

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const addIngredient = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
  const removeIngredient = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
  const initIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
  const purchaseInit = () => dispatch(actions.purchaseInit());
  const setAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

  /* We use useCallback() on initIngredients() since it's part of useEffect(). Otherwhise:
  It would call on mount, thus changing the Redux state, thus causing this component to re-render, thus
  recreating initIngredients, thus calling useEffect() over and over and so on.
  */

  const ingredients = useSelector(state => state.burgerBuilder.ingredients);
  const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuth = useSelector(state => state.auth.token);

  useEffect(() => {
    initIngredients();
  }, [initIngredients]);

  const purchaseHandler = () => {
    if (isAuth) setPurchasing(true);
    else {
      setAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const updatePurchaseState = () => {
    const sum = Object.keys(ingredients)
      .map(elm => {
        return ingredients[elm];
      })
      .reduce((sum, elm) => {
        return sum + elm;
      }, 0);

    return sum > 0;
  }

  const purchaseContinueHandler = () => {
    purchaseInit();
    props.history.push('/checkout');
  }

  const disabledInfo = {
    ...ingredients
  };

  for (let key in disabledInfo) {
    // {salad: false, meat: true, ···}
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  let orderSummary = null;
  let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

  if (ingredients) {
    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        price={totalPrice}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );

    burger = (
      <>
        <Burger ingredients={ingredients} />
        <div>
          <BuildControls
            totalPrice={totalPrice}
            ingredientAdded={addIngredient}
            ingredientRemoved={removeIngredient}
            disabled={disabledInfo}
            purchasable={updatePurchaseState()} // We call it directly. We need the result.
            isAuth={isAuth}
            ordered={purchaseHandler}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
}

/* const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null
  }
} */

/* const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
    removeIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
    initIngredients: () => dispatch(actions.initIngredients()),
    purchaseInit: () => dispatch(actions.purchaseInit()),
    setAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
} */

export default ErrorHandler(BurgerBuilder, axios);