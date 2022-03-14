import { Box, Button, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { User } from '../../../constants';

import { Input } from '../../FormElements'


const userFormSchema = yup.object().shape({

    'username': yup.string().required(),
    'code': yup.string(),
    'email': yup.string().email('Correo electrónico inválido').required(),
    'name': yup.string().required(),
    'last_name': yup.string().required(),
    'genre': yup.string(),
    'password': yup.string().required('Proporcione una connntraseña.')
        .min(8, 'La contraseña es muy corta (8 caracteres minimo)')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Debe contener 8 caracteres, una mayuscula, una minuscula, un número y un caracter especial."
        )
})

interface UserFormProps {
    element?: User;
    onCancel?: () => void;
}
const UserForm = ({ element = null, onCancel }: UserFormProps) => {
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(userFormSchema)
    });
    const { errors } = formState;


    const handleCreateUser: SubmitHandler<Response> = useCallback(async (values) => {
        setIsLoading(true);
        let msg = undefined;

        if (element) {
            // await updateUser({ id: user.id, ...values })
            // msg = `${values.name} modificado exitosamente.`;
        } else {
            // await createUser(values);
            // msg = `${values} creado exitosamente.`;
        }

        if (msg) {
            toast({
                description: msg,
                status: "success",
                position: "top",
                duration: 4000,
                isClosable: true,
            });
        }

        onCancel();
        setIsLoading(false);
    }, [toast, onCancel]);

    useEffect(() => {
        if (element) {
            reset({
                // name: element.name,
                // email: element.email
            });
        }
    }, [element])

    return (
        <Box as="form" onSubmit={handleSubmit(handleCreateUser)}>
            <Input
                placeholder="Titulo"
                error={errors.name}
                isRequired
                {...register('title')}
            />
            <Input
                mt={4}
                placeholder="E-mail"
                error={errors.email}
                {...register('description')}
            />
            <Button
                mr={3}
                isLoading={isLoading}
                colorScheme="cyan"
                type="submit"
            >
                Guardar
            </Button>

            <Button onClick={onCancel}>Cancelar</Button>
        </Box>
    )
}

export default UserForm