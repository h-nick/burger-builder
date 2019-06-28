import React from 'react';
import NavigationLinks from './Navigation_Link/Navigation_Link';
import Classes from './Navigation_Items.css';

const navigationItems = (props) => {
	return(<ul className={Classes.NavigationItems}>
		<NavigationLinks link='/'>Burger Builder</NavigationLinks>
		<NavigationLinks link='/orders'>Orders</NavigationLinks>
<<<<<<< HEAD
		<NavigationLinks link='/auth'>Authenticate</NavigationLinks>
=======
>>>>>>> 94affa979360d2e0e2a8d72a8e4e45c746594b27
	</ul>);
}

export default navigationItems;