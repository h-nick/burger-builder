import React from 'react';
import NavigationLinks from './Navigation_Link/Navigation_Link';
import Classes from './Navigation_Items.css';

const navigationItems = (props) => {
	return(<ul className={Classes.NavigationItems}>
		<NavigationLinks link='/' active>Burger Builder</NavigationLinks>
		<NavigationLinks link='/'>Checkout</NavigationLinks>
	</ul>);
}

export default navigationItems;