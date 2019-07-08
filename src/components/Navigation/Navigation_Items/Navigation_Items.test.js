import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './Navigation_Items';
import NavigationLink from './Navigation_Link/Navigation_Link';
import React from 'react';

configure({ adapter: new Adapter() });

describe('Navigation Items', () => {
	let wrapper;
	
	beforeEach(() => {
		wrapper = shallow(<NavigationItems/>);
	});


	it('Should render two NavigationLink if not authenticated.', () => {
		expect(wrapper.find(NavigationLink)).toHaveLength(2);
	});

	it('Should render three NavigationLink if authenticated.', () => {
		wrapper.setProps({
			isAuth: true
		});
		expect(wrapper.find(NavigationLink)).toHaveLength(3);
	});

	it('Should render a Log Out NavigationLink if authenticated.', () => {
		wrapper.setProps({
			isAuth: true
		});

		expect(wrapper.contains(<NavigationLink link='/logout'>Log Out</NavigationLink>)).toEqual(true);
	});
});