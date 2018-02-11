export function setOutput(msg, state = 0) {
  return {
    type: 'SET_MESSAGE',
    msg,
    state,
  };
}

export default null;
