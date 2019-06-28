import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/Ui/Input/Input';
import Button from '../../components/Ui/Button/Button';
import Classes from './Auth.css';
import * as actions from '../../store/actions/index.actions';
import Spinner from '../../components/Ui/Spinner/Spinner';

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

	inputChangedHandler = (event, controlID) => {
		const updatedControls = {
			...this.state.controls,
			[controlID]: {
				...this.state.controls[controlID],
				value: event.target.value,
				valid: this.checkValidation(event.target.value, this.state.controls[controlID].validation),
				touched: true
			}
		}

		this.setState({ controls: updatedControls });
	}

	checkValidation = (value, rules) => {
		// Each rule is checked against && isValid to avoid having the last rule change the isValid value to true
		// if another rule check changes it to false.

		let isValid = true;

		if(!rules) return true;

		if(rules.required) {
			// False if the trimmed value equals to an empty string.
			isValid = value.trim() !== '' && isValid;
		}

		if(rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if(rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
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

		return (
			<div className={Classes.Auth}>
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
		error: state.auth.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		auth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);