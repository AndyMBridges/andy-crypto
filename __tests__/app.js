import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

// tested endpoint
import App from '../src/components/app.js';

configure({ adapter: new Adapter() });

describe('App page', () => {
  test('shows title', () => {
    const app = shallow(<App />);

    expect(app.find('h1').text()).toEqual('Andy Crypto');
  });

  test('matches snapshot', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
