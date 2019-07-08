import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { BurgerBuilder } from './Burger_Builder';
import buildControls from '../../components/Burger/Build_Controls/Build_Controls';

configure({ adapter: new Adapter() });

describe('Burger Builder', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<BurgerBuilder initIngredients={() => {}}/>);
	});

	it('Should render Build Controls when receiving ingredients.', () => {
		wrapper.setProps({
			ingredients: {
				salad: 0
			}
		});

		expect(wrapper.find(buildControls)).toHaveLength(1);
	});
});