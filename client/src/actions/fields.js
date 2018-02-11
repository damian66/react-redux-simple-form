export function validateFields(key) {
  return {
    type: 'VALIDATE',
    key,
  };
}

export function fieldUpdateValue(key, value) {
  return {
    type: 'UPDATE_VALUE',
    key,
    value,
  };
}

export default null;
