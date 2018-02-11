const defaultState = {
  msg: '',
  state: '',
  time: 0,
};

export default function outputReducer(state = defaultState, action) {
  if (action.type === 'SET_MESSAGE') {
    return {
      ...state,
      msg: action.msg,
      state: action.state,
      time: Math.random(),
    };
  }

  return state;
}
