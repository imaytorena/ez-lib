import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Switch,
    useToast} from '@chakra-ui/react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

import { Book } from '../../../constants';
import { bookService } from '../../../services';

import { Input, TextArea } from '../../FormElements'
import { createBookFormSchema, editBookFormSchema } from './contants';
import CopiesTableForm from './CopiesTableForm';

interface BookFormProps {
    element?: Book;
    onCancel?: () => void;
}
const BookForm = ({ element = null }: BookFormProps) => {
    const toast = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [copiesState, setCopiesState] = useState([])

    const { register, handleSubmit, formState: { errors }, watch, reset, setError } = useForm({
        resolver: yupResolver(!element?.id ? createBookFormSchema : editBookFormSchema)
    });

    const watchStock = watch("stock");
    const watchAvailable = watch("available");

    const onCancel = () => {
        router.push("/books");
    }

    useEffect(() => {
        console.log(copiesState);
    }, [copiesState])
    
    const handleCreateUser: SubmitHandler<Response> = useCallback(async (values) => {
        setIsLoading(true);
        if (element) {
            bookService.update(element.id, values)
                .then(function (response) {
                    if (response.status == 201) {
                        router.push(`/users/${element.id}`)
                        toast({
                            description: response.data?.message || "Se editó exitosamente el libro",
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
                            description: responseData[key] || "Hubo un error al editar el libro",
                            status: "error",
                            position: "bottom",
                            duration: 4000,
                            isClosable: true,
                        });
                    })
                });
        } else {
            bookService.create(values)
                .then(function (response) {
                    if (response.status == 201) {
                        router.push(`/books/${response.data?.book?.id}`)
                        toast({
                            description: response.data?.message || "Se creó exitosamente el libro",
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
                        description: errors.response?.data?.message || "Hubo un error al crear el libro",
                        status: "error",
                        position: "bottom",
                        duration: 4000,
                        isClosable: true,
                    });
                });
        }
        setIsLoading(false);
    }, [element, router, toast, setError]);

    return (<>
        <Box as="form" onSubmit={handleSubmit(handleCreateUser)}>
            <HStack spacing={4}>
                <Input
                    label="Titulo"
                    placeholder="Ingresa el titulo"
                    isRequired

                    error={errors.title}
                    {...register('title')}
                />
                <Input
                    label="Autor"
                    placeholder="Ingresa el autor"
                    isRequired

                    error={errors.autor}
                    {...register('autor')}
                />
                <Input
                    label="Editorial"
                    placeholder="Ingresa la editorial"
                    isRequired

                    error={errors.publisher}
                    {...register('publisher')}
                />
            </HStack>
            <TextArea
                label="Descripción"
                placeholder="Ingresa la descripción"

                error={errors.description}
                {...register('description')}
            />
            <HStack spacing={4}>
                <Input
                    label="ISBN"
                    placeholder="Ingresa el código ISBN"
                    isRequired

                    error={errors.isbn}
                    {...register('isbn')}
                />
                <Input
                    label="Año"
                    placeholder="Ingresa el año de publicación"
                    maxLength={4}
                    isRequired
                    // pattern={"[0-9]+"}

                    error={errors.year}
                    {...register('year')}
                />
            </HStack>
            <HStack spacing={4}>
                <Input
                    label="Género"
                    placeholder="Ingresa el género literario"
                    isRequired

                    error={errors.genre}
                    {...register('genre')}
                />
                <FormControl display='flex' alignItems='center' justifyContent='center' width={"40%"}>
                    <FormLabel htmlFor='available' mb='0'>
                        Disponible
                    </FormLabel>
                    <Switch
                        id='available'

                        {...register('available')}
                    />
                    {!!errors?.available && (
                        <FormErrorMessage>
                            {errors.available}
                        </FormErrorMessage>
                    )}
                </FormControl>
                <Input
                    label="Existencias"
                    placeholder="Ingresa las existencias"
                    maxLength={3}
                    isRequired={watchAvailable}

                    error={errors.stock}
                    {...register('stock')}
                />
            </HStack>
            <CopiesTableForm
                copies={watchStock}
                copiesState={copiesState}
                setCopiesState={setCopiesState}

                theresUnsavedChanges={unsavedChanges}
                setUnsavedChanges={setUnsavedChanges}
            />

            <HStack mt={4} justify={"center"} spacing={8}>
                <Button onClick={onCancel}>Cancelar</Button>
                <Button
                    mr={3}
                    isLoading={isLoading}
                    colorScheme="cyan"
                    type="submit"
                >
                    {!!element ? 'Editar' : 'Guardar'}
                </Button>
            </HStack>
        </Box>
    </>
    )
}

export default BookForm