import React from 'react';
import Classes from './Drawer_Toggle.css';

const DrawerToggle = (props) => {
	return (
		<div className={Classes.DrawerToggle} onClick={props.click}>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}

export default DrawerToggle;