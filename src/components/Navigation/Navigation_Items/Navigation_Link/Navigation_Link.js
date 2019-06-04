import React from 'react';
import Classes from './Navigation_Link.css';
import { NavLink } from 'react-router-dom';

const navigationLink = (props) => {
	return <li className={Classes.NavigationLink}>
		<NavLink activeClassName={Classes.active} to={props.link} exact>{props.children}</NavLink>
	</li>;
}

export default navigationLink;