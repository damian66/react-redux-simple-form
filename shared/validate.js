module.exports = {
  validateField: (field) => {
    if (field.required && !field.value.replace(/\s/g, '')) {
      return {
        ...field,
        error: 'This field is required!',
      };
    }

    const error = field.validate ? field.validate(field.value) : false;
    return {
      ...field,
      error: error || false,
    };
  },

  validateEmail: (value) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(value)) {
      return 'E-mail address is invalid';
    }
    return false;
  },

  // dd/mm/yyyy
  validateDate: (value) => {
    const time = new Date(value).getTime();
    if (Number.isNaN(time)) {
      return 'Date is invalid';
    }
    return false;
  },
};
