import defaultFields from './../../../shared/fields';
import { validateField } from './../../../shared/validate';

const defaultState = {
  list: defaultFields,
};

function validateAll(array) {
  return array.map(item => validateField(item));
}

function validate(array, action) {
  if (action.key) {
    return array.map((item) => {
      if (item.key !== action.key) {
        return item;
      }

      return validateField(item);
    });
  }
  return validateAll(array);
}

function updateValue(array, action) {
  return array.map((item) => {
    if (item.key !== action.key) {
      return item;
    }

    return {
      ...item,
      value: action.value,
    };
  });
}

export default function fieldsReducer(state = defaultState, action) {
  if (action.type === 'VALIDATE') {
    return {
      ...state,
      list: validate(state.list, action),
    };
  } else
  if (action.type === 'UPDATE_VALUE') {
    return {
      ...state,
      list: updateValue(state.list, action),
    };
  }

  return state;
}
