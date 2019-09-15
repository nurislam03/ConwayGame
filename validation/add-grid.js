const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateGridInput(data) {
  let errors = {};

  data.x = !isEmpty(data.x) ? data.x : '';
  data.y = !isEmpty(data.y) ? data.y : '';
  data.data = !isEmpty(data.data) ? data.data : '';

//   if (!Validator.isNumeric(data.x)) {
//     errors.x = 'x must be a Number';
//   }

  if (Validator.isEmpty(data.x)) {
    errors.x = 'x field data is required';
  }

//   if (!Validator.isNumeric(data.y)) {
//     errors.y = 'y must be a Number';
//   }

  if (Validator.isEmpty(data.y)) {
    errors.y = 'y field data is required';
  }

  if (Validator.isEmpty(data.data)) {
    errors.data = 'data field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
