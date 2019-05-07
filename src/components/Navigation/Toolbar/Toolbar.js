import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigation_Items/Navigation_Items';
import DrawerToggle from '../Side_Drawer/Drawer_Toggle/Drawer_Toggle';
import Classes from './Toolbar.css';

const Toolbar = (props) => {
	return(
		<header className={Classes.Toolbar}>
			<DrawerToggle click={props.toggleSideDrawer}/>
			<div className={Classes.Logo}><Logo/></div>
			<nav className={Classes.DesktopOnly}>
				<NavigationItems/>
			</nav>
		</header>
	);
}

export default Toolbar;