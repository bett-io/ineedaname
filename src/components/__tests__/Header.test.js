/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import toJson from 'enzyme-to-json';
import Header from '../Header';
import { shallow } from 'enzyme';

describe('Header component', () => {
  test('should pass snapshot check', () => {
    const rendered = shallow(<Header />);
    expect(toJson(rendered)).toMatchSnapshot();
  });

  test('contains 1 <NavItem />s', () => {
    expect(shallow(<Header />).find('NavItem')).toHaveLength(1);
  });

  test('contains links to about, repos and hello', () => {
    const component = shallow(<Header />).find('LinkContainer');
    expect(component.findWhere(n => n.props().to === '/about')).toHaveLength(1);
  });
});
