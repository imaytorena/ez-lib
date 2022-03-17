import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    HStack,
    useToast
} from '@chakra-ui/react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

import { User } from '../../../constants';
import { userService } from '../../../services';

import { Input, PasswordInput, Select } from '../../FormElements'
import { createUserFormSchema, editUserFormSchema, genres } from './constants';

interface UserFormProps {
    element?: User;
    onCancel?: () => void;
}
const UserForm = ({ element = null }: UserFormProps) => {
    const toast = useToast();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState, reset, setError } = useForm({
        resolver: yupResolver(!element?.id ? createUserFormSchema : editUserFormSchema)
    });
    const { errors } = formState;

    const onCancel = () => {
        router.push("/users")
    }

    const handleCreateUser: SubmitHandler<Response> = useCallback(async (values) => {
        setIsLoading(true);
        if (element) {
            userService.update(element.id, values)
                .then(function (response) {
                    if (response.status == 201) {
                        router.push(`/users/${element.id}`)
                        toast({
                            description: response.data?.message || "Se editó el usuario exitosamente",
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
                        toast({
                            description: responseData[key] || "Hubo un error al editar",
                            status: "error",
                            position: "bottom",
                            duration: 4000,
                            isClosable: true,
                        });
                    })
                });
        } else {
            userService.create(values)
                .then(function (response) {
                    if (response.status == 201) {
                        router.push(`/users/${response.data?.user?.id}`)
                        toast({
                            description: response.data?.message || "Se creó el usuario exitosamente",
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
                        description: errors.response?.data?.message || "Hubo un error al crear",
                        status: "error",
                        position: "bottom",
                        duration: 4000,
                        isClosable: true,
                    });
                });
        }
        setIsLoading(false);
    }, [element, router, toast, setError]);

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
        {!element && <Alert mb={5} status='info'>
            <AlertIcon />
            <AlertTitle mr={2}>Puedes crear usuarios sin llenar todos los datos.</AlertTitle>
            <AlertDescription>Mas tarde se te solicitará actualizarlos.</AlertDescription>
        </Alert>}
        <Box as="form" onSubmit={handleSubmit(handleCreateUser)}>
            <HStack spacing={4}>
                <Input
                    label="Nombre de usuario"
                    placeholder="Ingresa un nombre de usuario"
                    isRequired

                    error={errors.username}
                    {...register('username')}
                />
                <PasswordInput
                    label="Contraseña"
                    placeholder="Ingresa una contraseña"
                    isRequired
                    disabled={!!element}

                    error={errors.password}
                    {...register('password')}
                />
            </HStack>
            <HStack spacing={4}>
                <Input
                    label="Código"
                    placeholder="Ingrese su código"

                    error={errors.code}
                    {...register('code')}
                />
                <Input
                    label="Correo electrónico"
                    placeholder="Ingrese un correo electrónico"

                    error={errors.email}
                    {...register('email')}
                />
            </HStack>
            <HStack spacing={4}>
                <Input
                    label="Nombre"
                    placeholder="Ingrese su primer nombre"

                    error={errors.name}
                    {...register('name')}
                />
                <Input
                    label="Apellido"
                    placeholder="Ingrese su primer apellido"

                    error={errors.last_name}
                    {...register('last_name')}
                />
            </HStack>
            <Select
                label="Género"
                placeholder="Seleccione su genero"
                options={genres}

                error={errors.genre}
                {...register('genre')}
            />

            <HStack mt={4} justify={"center"} spacing={8}>
                <Button
                    mr={3}
                    isLoading={isLoading}
                    colorScheme="cyan"
                    type="submit"
                >
                    {!!element ? 'Editar' : 'Guardar'}
                </Button>
                <Button onClick={onCancel}>Cancelar</Button>
            </HStack>
        </Box>
    </>)
}

export default UserForm