import React from 'react';
import Classes from './Side_Drawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigation_Items/Navigation_Items';
import Backdrop from '../../Ui/Backdrop/Backdrop';

const sideDrawer = (props) => {
	let attachedClasses = [Classes.SideDrawer, Classes.Close];

	if(props.open) {
		attachedClasses.pop();
		attachedClasses.push(Classes.Open);
	}

	return (
		<>
			<Backdrop show={props.open} clicked={props.closed}/>
			<div className={attachedClasses.join(' ')} onClick={props.closed}>
				<div className={Classes.Logo}><Logo/></div>
				<nav>
					<NavigationItems isAuth={props.isAuth}/>
				</nav>
			</div>
		</>
	);
}

export default sideDrawer;