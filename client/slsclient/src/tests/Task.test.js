import React from 'react';
import ReactDOM from 'react-dom';
import Task from '../Components/Task';

import { shallow } from 'enzyme';

import renderer from 'react-test-renderer';

describe('Task component', () => {
  
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Task />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('Task matches the snapshot',()=>{
        const tree = renderer.create(<Task />).toJSON();
    
        expect(tree).toMatchSnapshot();
      });
  });