import { Yup } from "../yupExtensions.js";

const createCategorySchema = Yup.object().shape({
    name: Yup.string()
    .requiredField('Name'),

    description: Yup.string()
    .requiredField('Description'),
});


export { createCategorySchema }