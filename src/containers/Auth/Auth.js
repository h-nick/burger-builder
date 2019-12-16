import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/Ui/Input/Input';
import Button from '../../components/Ui/Button/Button';
import Classes from './Auth.css';
import * as actions from '../../store/actions/index.actions';
import Spinner from '../../components/Ui/Spinner/Spinner';
import updateObject from '../../utils/updateObject';
import checkValidation from '../../utils/checkValidation';

const Auth = (props) => {
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your email address'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Your password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 7
      },
      valid: false,
      touched: false
    }
  });

  const [signUpMode, setSignUpMode] = useState(true);

  const { building, authRedirectPath, setRedirectPath } = props;

  useEffect(() => {
    if (building && authRedirectPath !== '/') {
      setRedirectPath();
    }
  }, [authRedirectPath, building, setRedirectPath]);

  const inputChangedHandler = (event, controlID) => {
    const updatedControls = updateObject(controls, {
      [controlID]: updateObject(controls[controlID], {
        value: event.target.value,
        valid: checkValidation(
          event.target.value,
          controls[controlID].validation
        ),
        touched: true
      })
    });

    setControls(updatedControls);
  }

  const submitHandler = event => {
    event.preventDefault();
    props.auth(
      controls.email.value,
      controls.password.value,
      signUpMode
    );
  }

  const switchModeHandler = () => {
    setSignUpMode(prevState => !prevState);
  }

  const formElements = [];

  for (let key in controls) {
    formElements.push({
      id: key,
      config: controls[key]
    })
  }

  let form = formElements.map(e => (
    <Input
      key={e.id}
      elementType={e.config.elementType}
      value={e.config.value}
      config={e.config.elementConfig}
      changed={(event) => inputChangedHandler(event, e.id)}
      invalid={!e.config.valid}
      shouldValidate={e.config.validation}
      touched={e.config.touched}
    />
  ));

  if (props.loading) form = <Spinner />;

  let errorMessage = null;
  if (props.error) errorMessage = <p>{props.error.message}</p>;

  let authRedirect = null;
  if (props.isAuth) authRedirect = <Redirect to={props.authRedirectPath} />;

  return (
    <div className={Classes.Auth}>
      {authRedirect}
      <form onSubmit={submitHandler}>
        {form}
        {errorMessage}
        <Button type='Success'>SUBMIT</Button>
      </form>
      <Button
        clicked={switchModeHandler}
        type='Danger'>SWITCH TO {signUpMode ? 'SIGN IN' : 'SIGN UP'}</Button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    setRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);