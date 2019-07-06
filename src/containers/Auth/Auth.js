import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/Ui/Input/Input';
import Button from '../../components/Ui/Button/Button';
import Classes from './Auth.css';
import * as actions from '../../store/actions/index.actions';
import Spinner from '../../components/Ui/Spinner/Spinner';
import updateObject from '../../utils/updateObject';
import checkValidation from '../../utils/checkValidation';

class Auth extends Component {
	state = {
		controls: {
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
		},
		signUpMode: true
	}

	componentDidMount() {
		if(!this.props.building && this.props.authRedirectPath !== '/') {
			this.props.setRedirectPath();
		}
	}

	inputChangedHandler = (event, controlID) => {
		const updatedControls = updateObject(this.state.controls, {
			[controlID]: updateObject(this.state.controls[controlID], {
				value: event.target.value,
				valid: checkValidation(
					event.target.value,
					this.state.controls[controlID].validation
				),
				touched: true
			})
		});

		this.setState({ controls: updatedControls });
	}

	submitHandler = event => {
		event.preventDefault();
		this.props.auth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.signUpMode
		);
	}

	switchModeHandler = () => {
		this.setState(prevState => {
			return { signUpMode: !prevState.signUpMode }
		});
	}

	render() {
		const formElements = [];

		for(let key in this.state.controls) {
			formElements.push({
				id: key,
				config: this.state.controls[key]
			})
		}

		let form = formElements.map(e => (
			<Input
			key = {e.id}
			elementType = {e.config.elementType}
			value = {e.config.value}
			config = {e.config.elementConfig}
			changed = {(event) => this.inputChangedHandler(event, e.id)}
			invalid = {!e.config.valid}
			shouldValidate = {e.config.validation}
			touched = {e.config.touched}
			/>
		));

		if(this.props.loading) form = <Spinner/>;
		
		let errorMessage = null;
		if(this.props.error) errorMessage = <p>{this.props.error.message}</p>;

		let authRedirect = null;
		if(this.props.isAuth) authRedirect = <Redirect to={this.props.authRedirectPath}/>;

		return (
			<div className={Classes.Auth}>
				{authRedirect}
				<form onSubmit={this.submitHandler}>
					{form}
					{errorMessage}
					<Button type='Success'>SUBMIT</Button>
				</form>
				<Button
				clicked={this.switchModeHandler}
				type='Danger'>SWITCH TO {this.state.signUpMode ? 'SIGN IN' : 'SIGN UP'}</Button>
			</div>
		);
	}
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