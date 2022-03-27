import * as yup from "yup";

export const createBookFormSchema = yup.object().shape({
    title: yup.string().required("El titulo es requerido"),
    description: yup.string().nullable(),

    autor: yup.string().required("El autor es requerido"),
    publisher: yup.string().required("La editorial es requerida"),
    isbn: yup
        .number()
        .typeError("El ISBN debe ser un número")
        .test(
            "len",
            "El ISBN no es válido (10 caracteres)",
            (val) => val && val.toString().length === 10
        )
        .required("El ISBN es requerido"),
    year: yup
        .number()
        .typeError("El año debe ser un número")
        .test(
            "len",
            "El año no es válido (4 caracteres)",
            (val) => val && val.toString().length === 4
        )
        .max(
            new Date().getFullYear(),
            `El año debe ser menor a ${new Date().getFullYear()}`
        )
        .required("El año es requerido"),

    genre: yup.string().required("El género es requerido"),

    available: yup.string().required("La disponibilidad es requerida"),
    stock: yup.string().when("available", {
        is: (available) => available,
        then: yup.string().required("La existencia es requerida"),
        otherwise: yup.string()
    }),
});

export const editBookFormSchema = yup.object().shape({
    title: yup.string().required("El titulo es requerido"),
    description: yup.string().nullable(),

    autor: yup.string().required("El autor es requerido"),
    publisher: yup.string().required("La editorial es requerida"),
    isbn: yup
        .number()
        .typeError("El ISBN debe ser un número")
        .test(
            "len",
            "El ISBN no es válido (10 caracteres)",
            (val) => val && val.toString().length === 10
        )
        .required("El ISBN es requerido"),
    year: yup
        .number()
        .typeError("El año debe ser un número")
        .test(
            "len",
            "El año no es válido (4 caracteres)",
            (val) => val && val.toString().length === 4
        )
        .max(
            new Date().getFullYear(),
            `El año debe ser menor a ${new Date().getFullYear()}`
        )
        .required("El año es requerido"),

    genre: yup.string().required("El género es requerido"),

    available: yup.string().required("La disponibilidad es requerida"),
    stock: yup.string().when("available", {
        is: (available) => available,
        then: yup.string().required("La existencia es requerida"),
        otherwise: yup.string()
    }),
});
