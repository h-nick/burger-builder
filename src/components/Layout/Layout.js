import React, { Component } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/Side_Drawer/Side_Drawer';
import Classes from './Layout.css';

export default class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showSideDrawer: false
		};
	}

	sideDrawerCloseHandler = () => {
		this.setState({
			showSideDrawer: false
		});
	}

	sideDrawerOpenHandler = () => {
		this.setState({
			showSideDrawer: true
		});
	}

	render() {
		return (
			<>
				<Toolbar toggleSideDrawer={this.sideDrawerOpenHandler}/>
				<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
				<main className={Classes.Content}>
					{this.props.children}
				</main>
			</>			
		);
	}
}