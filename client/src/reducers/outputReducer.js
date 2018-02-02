export default function outputReducer(state, action) {
    // Initial state
    if (!state) {        
        state = {
            msg: "",
            state: "",
            time: 0
        };
    }

    if (action.type === 'SET_MESSAGE') {        
        return {
            ...state, 
            msg: action.msg,
            state: action.state,
            time: Math.random()
        }
    }
    else {
        return state;
    }
}