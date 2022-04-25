import {
    Box,
    Button,
    Stack,
    useToast
} from '@chakra-ui/react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

import { User } from '../../../constants';
import { authService } from '../../../services';

import { Input, PasswordInput } from '../../FormElements'
import { loginSchema } from './constants';

interface LoginProps {
    element?: User;
    onCancel?: () => void;
}
const LoginForm = ({ element = null }: LoginProps) => {
    const toast = useToast();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState, reset, setError } = useForm({
        resolver: yupResolver(loginSchema)
    });
    const { errors } = formState;

    const handleLogin: SubmitHandler<Response> = useCallback(async (values) => {
        setIsLoading(true);
        // TODO:https://dev.to/mabaranowski/nextjs-authentication-jwt-refresh-token-rotation-with-nextauthjs-5696
        router.push('/books');
        // await authService.login(values)
        //     .then(function (response) {
        //         if (response.status == 201) {
        //             router.push(`/books`);
        //             toast({
        //                 description: response.data?.message || "Se inicio exitosamente la sesión ",
        //                 status: "success",
        //                 position: "bottom",
        //                 duration: 4000,
        //                 isClosable: true,
        //             });
        //         }
        //     })
        //     .catch(async (errors) => {
        //         let responseData = errors.response?.data

        //         Object.keys(responseData).forEach((key) => {
        //             setError(key, {
        //                 type: "manual",
        //                 message: responseData[key],
        //             });
        //         })
        //         toast({
        //             description: errors.response?.data?.message || "Hubo un error al registrar el usuario",
        //             status: "error",
        //             position: "bottom",
        //             duration: 4000,
        //             isClosable: true,
        //         });
        //     });
        setIsLoading(false);
    }, [router, toast, setError]);

    useEffect(() => {
        if (!!element) {
            reset({
                email: element.email,
                password: element.password,
            });
        }
    }, [element, reset])


    return (<>
        <Box as="form" onSubmit={handleSubmit(handleLogin)}>
            <Input
                label="Usuario o Correo electrónico"
                isRequired

                error={errors.email}
                {...register('email')}
            />
            <PasswordInput
                label="Contraseña"
                isRequired
                disabled={!!element}

                error={errors.password}
                {...register('password')}
            />

            <Stack spacing={10} pt={2}>
                <Button
                    type="submit"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                        bg: 'blue.500',
                    }}
                    isLoading={isLoading}
                >
                    Iniciar Sesión
                </Button>
            </Stack>
        </Box>
    </>)
}

export default LoginForm