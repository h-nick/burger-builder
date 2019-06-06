import React from 'react';
import Classes from './Input.css';

const Input = (props) => {
	let inputElement;

	/* Deprecated. Left for reference.
	switch(props.inputtype) { // Named like this due to React 16.6 passing an invalid "inputType" HTML attr.
		case 'input':
			// By spreading props you can pass normal html attributes to the component.
			inputElement = <input {...props}/>
			break;
		case 'textarea':
			inputElement = <textarea {...props}/> // <textarea> is a self-closing element in React.
			break;
		default:
			inputElement = <input {...props}/>
	}*/

	switch(props.elementType) {
		case 'input':
			inputElement = (
				<input
				{...props.config}
				value={props.value}
				onChange={props.changed}
				className={props.invalid && props.shouldValidate && props.touched ? Classes.Invalid : null}
				/>
			)
			break;
		case 'textarea':
			inputElement = (
				<textarea
				{...props.config}
				value={props.value}
				onChange={props.changed}
				className={props.invalid && props.shouldValidate && props.touched ? Classes.Invalid : null}
				/>
			)
			break;
		case 'select':
			inputElement = (
				<select
				value={props.value}
				onChange={props.changed}
				className={props.invalid && props.shouldValidate && props.touched ? Classes.Invalid : null}>
					{props.config.options.map(e => (
						<option key={e.value} value={e.value}>{e.displayValue}</option>
					))}
				</select>);
			break;
		default:	
			inputElement = (
				<input
				{...props.config}
				value={props.value}
				onChange={props.changed}
				className={props.invalid && props.shouldValidate && props.touched ? Classes.Invalid : null}
				/>
			)
			break;
	}

	let validationError = null;
	if(props.invalid && props.touched) {
		validationError = <p className={Classes.Error}>Please enter a valid value!</p>;
	}

	return (
		<div className={Classes.Input}>
			<label>{props.label}</label>
			{inputElement}
			{validationError}
		</div>
	);
}

export default Input;