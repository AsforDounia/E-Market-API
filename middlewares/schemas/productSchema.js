import { Yup } from "../yupExtensions.js";

const createProductSchema = Yup.object().shape({
  title: Yup.string()
    .requiredField('Title'),
  
  description: Yup.string()
    .requiredField('Description'),
  
  price: Yup.number()
    .requiredField('Price')
    .minValue(0, 'Price')
    .typeError('Price must be a number'),
  
  stock: Yup.number()
    .requiredField('Stock')
    .minValue(0, 'Stock')
    .typeError('Stock must be a number'),
  
  imageUrl: Yup.string()
    .url('Image URL must be a valid URL')
    .optional()
});


export { createProductSchema }