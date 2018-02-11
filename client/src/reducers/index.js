import { combineReducers } from 'redux';

import output from './outputReducer';
import fields from './fieldsReducer';

export default combineReducers({
  output,
  fields,
});
