import React from 'react';
import NavigationLinks from './Navigation_Link/Navigation_Link';
import Classes from './Navigation_Items.css';

const navigationItems = (props) => {
	return(<ul className={Classes.NavigationItems}>
		<NavigationLinks link='/'>Burger Builder</NavigationLinks>
		<NavigationLinks link='/orders'>Orders</NavigationLinks>
		<NavigationLinks link='/auth'>Authenticate</NavigationLinks>
	</ul>);
}

export default navigationItems;