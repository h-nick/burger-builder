import React from 'react';
import Classes from './Navigation_Link.css';

const navigationLink = (props) => {
	return <li className={Classes.NavigationLink}>
		<a href={props.link} className={props.active ? Classes.Active : null}>{props.children}</a>
	</li>;
}

export default navigationLink;