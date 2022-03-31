import {
    Box,
    Button,
    HStack,
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
import { signupSchema } from './constants';

interface LoginProps {
    element?: User;
    onCancel?: () => void;
}
const LoginForm = ({ element = null }: LoginProps) => {
    const toast = useToast();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState, reset, setError } = useForm({
        resolver: yupResolver(signupSchema)
    });
    const { errors } = formState;

    const handleLogin: SubmitHandler<Response> = useCallback(async (values) => {
        setIsLoading(true);
        authService.login(values)
            .then(function (response) {
                console.log(response)
                if (response.status == 201) {
                    console.log(response.data)
                    // router.push(`/users/${response.data?.user?.id}`)
                    toast({
                        description: response.data?.message || "Se creó exitosamente el usuario ",
                        status: "success",
                        position: "bottom",
                        duration: 4000,
                        isClosable: true,
                    });
                }
            })
            .catch(async (errors) => {
                let responseData = errors.response?.data

                Object.keys(responseData).forEach((key) => {
                    setError(key, {
                        type: "manual",
                        message: responseData[key],
                    });
                })
                toast({
                    description: errors.response?.data?.message || "Hubo un error al registrar el usuario",
                    status: "error",
                    position: "bottom",
                    duration: 4000,
                    isClosable: true,
                });
            });
        setIsLoading(false);
    }, [toast, setError]);

    useEffect(() => {
        if (!!element) {
            reset({
                username: element.username,
                password: element.password,
                code: element.code,
                email: element.email,
                name: element.name,
                last_name: element.last_name,
                genre: element.genre
            });
        }
    }, [element, reset])


    return (<>
        <Box as="form" onSubmit={handleSubmit(handleLogin)}>
            <Input
                label="Usuario o Correo electrónico"
                isRequired

                error={errors.name}
                {...register('credentials')}
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
                    Iniciar Sesion
                </Button>
            </Stack>
        </Box>
    </>)
}

export default LoginForm