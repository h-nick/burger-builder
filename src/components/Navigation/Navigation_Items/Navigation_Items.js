import React from 'react';
import NavigationLinks from './Navigation_Link/Navigation_Link';
import Classes from './Navigation_Items.css';

const navigationItems = (props) => {
	let authLink = null;
	let ordersLink = null;

	if(props.isAuth) {
		authLink = <NavigationLinks link='/logout'>Log Out</NavigationLinks>;
		ordersLink = <NavigationLinks link='/orders'>Orders</NavigationLinks>;
	} else {
		authLink = <NavigationLinks link='/auth'>Authenticate</NavigationLinks>;
	}

	return(<ul className={Classes.NavigationItems}>
		<NavigationLinks link='/'>Burger Builder</NavigationLinks>
		{ordersLink}
		{authLink}
	</ul>);
}

export default navigationItems;