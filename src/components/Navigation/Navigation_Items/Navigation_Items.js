import React from 'react';
import NavigationLink from './Navigation_Link/Navigation_Link';
import Classes from './Navigation_Items.css';

const navigationItems = (props) => {
	let authLink = null;
	let ordersLink = null;

	if(props.isAuth) {
		authLink = <NavigationLink link='/logout'>Log Out</NavigationLink>;
		ordersLink = <NavigationLink link='/orders'>Orders</NavigationLink>;
	} else {
		authLink = <NavigationLink link='/auth'>Authenticate</NavigationLink>;
	}

	return(<ul className={Classes.NavigationItems}>
		<NavigationLink link='/'>Burger Builder</NavigationLink>
		{ordersLink}
		{authLink}
	</ul>);
}

export default navigationItems;