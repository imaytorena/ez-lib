import * as yup from 'yup';

export const genres = [
    {value: "male",label: "Masculino"},
    {value: "female",label: "Femenino"},
    {value: "other",label: "Otro"},
];

export const loginSchema = yup.object().shape({
    'email': yup.string().required('El nombre de usuario o correo es requerido'),
    'password': yup.string().required('Proporcione una contraseña.')
        .min(8, 'La contraseña es muy corta (8 caracteres minimo)')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            "Mínimo 8 caracteres y minimo un número."
            ),
});

export const signupSchema = yup.object().shape({
    'name': yup.string().required('El nombre de usuario es requerido'),
    'last_name': yup.string()
        .nullable(),
     
    'email': yup.string()
        .email('Correo electrónico inválido')
        .required('El correo electrónico es requerido'),
    
    'username': yup.string().required('El nombre de usuario es requerido'),
    'code': yup.string().nullable(),

    'password': yup.string().required('Proporcione una contraseña.')
        .min(8, 'La contraseña es muy corta (8 caracteres minimo)')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            "Mínimo 8 caracteres y minimo un número."
            ),
})
