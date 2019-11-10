import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

import { shallow } from 'enzyme';

import renderer from 'react-test-renderer';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });


describe('App component', () => {
  
  it('renders hello world', () => {
    const wrapper = shallow(<App />);
    const text = wrapper.find('h1').text();
    expect(text).toEqual('Hello World');

  });

  it('App matches the snapshot',()=>{
    const tree = renderer.create(<App />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});