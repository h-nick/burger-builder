import React from 'react';
import Classes from './Logo.css';
import BurgerLogoImage from '../../assets/images/burger-logo.png';

/* Why do we import the image?
Due to the way the workflow is set (using Webpack), we can't simply hardcode the image URI into an <img>
tag.

In the end, the assets folder won't be shipped anywhere, but rather will be bundled and combined by
webpack while optimizing our application from production.

To make Webpack aware of the fact that we're using an image, in a similar fashion to CSS code, we'll
import that image in our JS code and then use it in our <img> tag.
*/

const Logo = (props) => {
	return(<div className={Classes.Logo}>
		<img src={BurgerLogoImage} alt="Burger logo"/>
	</div>)
}

export default Logo;