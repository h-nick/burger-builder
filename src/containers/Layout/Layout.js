import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/Side_Drawer/Side_Drawer';
import Classes from './Layout.css';

class Layout extends Component {
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
				<Toolbar
				isAuth={this.props.isAuth}
				toggleSideDrawer={this.sideDrawerOpenHandler}/>

				<SideDrawer
				isAuth={this.props.isAuth}
				open={this.state.showSideDrawer}
				closed={this.sideDrawerCloseHandler}/>
				
				<main className={Classes.Content}>
					{this.props.children}
				</main>
			</>			
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null
	}
}

export default connect(mapStateToProps)(Layout);