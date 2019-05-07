import React from 'react';
import Classes from './Backdrop.css';

const Backdrop = (props) => {
	return(
		props.show ? <div className={Classes.Backdrop} onClick={props.clicked}></div> : null
	);
}

export default Backdrop;