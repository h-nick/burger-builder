import React, { useState } from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/Side_Drawer/Side_Drawer';
import Classes from './Layout.css';

const Layout = (props) => {
  const [showSideDrawer, setSideDrawer] = useState(false);

	const sideDrawerCloseHandler = () => {
    setSideDrawer(false);
	}

	const sideDrawerOpenHandler = () => {
    setSideDrawer(true);
	}

  return (
    <>
      <Toolbar
      isAuth={props.isAuth}
      toggleSideDrawer={sideDrawerOpenHandler}/>

      <SideDrawer
      isAuth={props.isAuth}
      open={showSideDrawer}
      closed={sideDrawerCloseHandler}/>
      
      <main className={Classes.Content}>
        {props.children}
      </main>
    </>			
  );
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null
	}
}

export default connect(mapStateToProps)(Layout);