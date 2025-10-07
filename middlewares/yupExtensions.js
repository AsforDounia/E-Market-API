import * as Yup from 'yup';


Yup.addMethod(Yup.string, 'requiredField', function(fieldName) {
  return this.required(`${fieldName} is required`).trim();
});

Yup.addMethod(Yup.string, 'minLength', function(length, fieldName) {
  return this.min(length, `${fieldName} must be at least ${length} characters long`);
});

Yup.addMethod(Yup.string, 'maxLength', function(length, fieldName) {
  return this.max(length, `${fieldName} must not exceed ${length} characters`);
});

Yup.addMethod(Yup.string, 'emailField', function(fieldName) {
  return this
    .required(`${fieldName} is required`)
    .trim()
    .email('Please fill a valid email address');
});

Yup.addMethod(Yup.string, 'enumField', function(values, fieldName) {
  const valuesList = values.join(', ');
  return this.oneOf(
    values,
    `${fieldName} must be one of: ${valuesList}`
  );
});



export { Yup } ;