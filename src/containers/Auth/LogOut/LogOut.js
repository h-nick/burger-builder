import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index.actions';

const LogOut = (props) => {
  const { logOut } = props;

  useEffect(() => {
    logOut();
  }, [logOut]);

  return (
    <Redirect to='/' />
  );
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(actions.authLogOut())
  }
}

export default connect(null, mapDispatchToProps)(LogOut);