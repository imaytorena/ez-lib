import * as yup from 'yup';

export const createBookFormSchema = yup.object().shape({
    'title': yup.string().required('El titulo es requerido'),
    'description': yup.string().required('La descripción es requerida'),
})

export const editBookFormSchema = yup.object().shape({
    'title': yup.string(),
    'description': yup.string(),
})
