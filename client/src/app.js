import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import style from './app.css';

import Form from './components/Form'
import SnackBar from './components/SnackBar'

class App extends React.Component {    
    constructor(props) {
        super(props);             
    }    
    render() {                
        return (            
            <Provider store={store}>
                <React.Fragment>
                    <SnackBar />
                    <Form />        
                </React.Fragment>    
            </Provider>
        )
    }
}

render(<App/>, document.getElementById(`app`))