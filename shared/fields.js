const { validateEmail, validateDate } = require('./validate');

module.exports = [
  {
    key: 'firstName',
    name: 'First name',
    placeholder: 'John',
    type: 'text',
    required: true,
  },
  {
    key: 'lastName',
    name: 'Last name',
    placeholder: 'Doe',
    type: 'text',
    required: true,
  },
  {
    key: 'email',
    name: 'Email address',
    placeholder: 'johndoe@gmail.com',
    type: 'email',
    required: true,
    validate: validateEmail,
  },
  {
    key: 'date',
    name: 'Event date',
    placeholder: 'mm/dd/yyyy',
    type: 'date',
    required: true,
    validate: validateDate,
  },
];
