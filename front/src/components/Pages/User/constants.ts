import * as yup from 'yup';

export const genres = [
    {value: "male",label: "Masculino"},
    {value: "female",label: "Femenino"},
    {value: "other",label: "Otro"},
];

export const createUserFormSchema = yup.object().shape({
    'username': yup.string().required('El nombre de usuario es requerido'),
    'password': yup.string().required('Proporcione una contraseña.')
        .min(8, 'La contraseña es muy corta (8 caracteres minimo)')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            "Mínimo 8 caracteres y minimo un número."
        ),
    'code': yup.string()
        .nullable(),
    'email': yup.string()
        .email('Correo electrónico inválido')
        .nullable(),
    'name': yup.string()
        .nullable(),
    'last_name': yup.string()
        .nullable(),
    'genre': yup.string()
        .nullable(),
})

export const editUserFormSchema = yup.object().shape({
    'username': yup.string(),
    'code': yup.string()
        .nullable(),
    'email': yup.string()
        .email('Correo electrónico inválido')
        .nullable(),
    'name': yup.string()
        .nullable(),
    'last_name': yup.string()
        .nullable(),
    'genre': yup.string()
        .nullable(),
})

export const generos = { "male": "Masculino", "female": "Femenino", "other": "Otro" };