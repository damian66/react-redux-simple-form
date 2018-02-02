import defaultFields from './../../../shared/fields'
import { validateField } from './../../../shared/validate'

export default function fieldsReducer(state, action) {    
    // Initial state
    if (!state) {        
        state = {
            list: defaultFields
        };
    }

    if (action.type === 'VALIDATE') {        
        return {
            ...state, 
            list: validate(state.list, action)
        }
    }
    else
    if(action.type === 'UPDATE_VALUE') {
        return {
            ...state,
            list: updateValue(state.list, action)
        }
    }
    else {
        return state;
    }
}

function validate(array, action) {    
    if(action.key) {

        return array.map(item => {                  
            if(item.key !== action.key) {            
                return item;
            }

            return validateField(item);
        });

    } else {                
        return validateAll(array);            
    }
}

function validateAll(array) {
    return array.map(item => {        
        return validateField(item);
    })
}

function updateValue(array, action) {    
    return array.map( (item, index) => {             
        if(item.key !== action.key) {            
            return item;
        }
                    
        return {
            ...item,
            value: action.value
        };    
    });
}