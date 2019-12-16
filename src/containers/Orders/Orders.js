import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../utils/axios_orders';
import withErrorHandler from '../../components/HOC/Error_Handler/Error_Handler';
import * as actions from '../../store/actions/index.actions';
import { connect } from 'react-redux';
import Spinner from '../../components/Ui/Spinner/Spinner';

const Orders = (props) => {
  const { token, userID, fetchOrders } = props;

  useEffect(() => {
    fetchOrders(token, userID);
  }, [fetchOrders, token, userID]);

  let orders = <Spinner />;

  if (!props.loading) {
    orders = (
      props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ))
    );
  }

  return (
    <div>
      {orders}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
    token: state.auth.token,
    userID: state.auth.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (token, userID) => dispatch(actions.fetchOrders(token, userID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
