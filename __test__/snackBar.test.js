import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import ConnectedSnackBar, { SnackBar } from './../client/src/components/SnackBar'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'

import {createStore} from 'redux'

// Snapshot
describe('>>>SnackBar --- Snapshot',()=>{    
    it('+++capturing Snapshot of SnackBar', () => {
        const renderedValue =  renderer.create(<SnackBar />).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });
});

/* ***** ***** ***** */

describe('>>>SnackBar --- Shallow Render REACT COMPONENTS',()=>{
    const initialState = {
        msg: "Test",
        state: 1
    }
    const mockStore = configureStore()
    let store, wrapper

    beforeEach(()=>{
        store = mockStore(initialState)
        wrapper = mount( <Provider store={store}><ConnectedSnackBar /></Provider> )        
    })

    it('+++ render the component', () => {
       expect(wrapper.length).toEqual(1);
    })
});
