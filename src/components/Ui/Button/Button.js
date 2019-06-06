import React from 'react';
import Classes from './Button.css';

const Button = (props) => {
	// Creating our own button so we can easily change styles throughout the app.
	// We always include the .Button class and then select either 'Danger' or 'Success' from a prop.
	// After that we join them (since in the end, className receives a string).
	return (
		<button
		className={[Classes.Button, Classes[props.type]].join(' ')}
		onClick={props.clicked}
		disabled={props.disabled}>
			{props.children}
		</button>
	);
}

export default Button;