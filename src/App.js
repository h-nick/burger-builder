import React from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/Burger_Builder/Burger_Builder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
<<<<<<< HEAD
import Auth from './containers/Auth/Auth';
=======
>>>>>>> 94affa979360d2e0e2a8d72a8e4e45c746594b27
import { Route, Switch } from 'react-router-dom';

function App() {
	return (
		<div>
			<Layout>
				<Switch>
<<<<<<< HEAD
					<Route path='/auth' component={Auth}/>
=======
>>>>>>> 94affa979360d2e0e2a8d72a8e4e45c746594b27
					<Route path='/orders' component={Orders}/>
					<Route path="/checkout" component={Checkout}/>
					<Route path="/" component={BurgerBuilder}/>
				</Switch>
			</Layout>
		</div>
	);
}

export default App;
