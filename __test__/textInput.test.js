import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import ConnectedTextInput, { TextInput } from './../client/src/components/TextInput'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'

import {createStore} from 'redux'

const fields = [{
    key: "email",
    name: "Email address",
    placeholder: "johndoe@gmail.com",
    type: "email",
    required: true,
    validate: () => "ok"
}];

// Snapshot
describe('>>>TextInput --- Snapshot',()=>{
    it('+++capturing Snapshot of TextInput', () => {                
        const renderedValue =  renderer.create(<TextInput id="email" type="text" fields={fields} />).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });
});

/* ***** ***** ***** */

describe('>>>SnackBar --- Shallow Render REACT COMPONENTS',()=>{    
    const initialState = {
        fields: {
            list: fields
        }
    }
    const mockStore = configureStore()
    let store, wrapper

    beforeEach(()=>{
        store = mockStore(initialState)
        wrapper = mount( <Provider store={store}><ConnectedTextInput id={initialState.fields.list[0].key} f /></Provider> )        
    })

    it('+++ render the component', () => {        
       expect(wrapper.length).toEqual(1);
    })
});
