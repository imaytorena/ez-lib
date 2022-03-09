import { useCallback, useEffect, useRef } from "react";

import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	useToast,
	Box,
} from "@chakra-ui/react";

import { SubmitHandler, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

// import { useUsers } from "../../context/UseUsersContext";

import { Input } from '../../components/Form/Input';
import { Row } from "../../constants";
import { Book } from "../../constants/books";

type User = {
	id: string,
	name: string;
	email: string;
	createdAt: string;
}

type Model = Row | Book | User | undefined;

interface FormModalProps {
	element: Model;
	isOpen: boolean;
	onClose: () => void;
}

let isLoading = false;

const createUserFormSchema = yup.object().shape({
	// name: yup.string().required('Nome obrigatório'),
	// email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
})

export function FormModal({ element = null, isOpen, onClose }: FormModalProps) {
	// const { createUser, updateUser } = useUsers();

	const { register, handleSubmit, formState, reset } = useForm({
		resolver: yupResolver(createUserFormSchema)
	});
	const { errors } = formState;

	const toast = useToast();

	const initialRef = useRef();
	const finalRef = useRef();

	useEffect(() => {
		reset({
			// name: '',
			// email: ''
		});
	}, [isOpen])

	useEffect(() => {
		if (element) {
			reset({
				// name: element.name,
				// email: element.email
			});
		}
	}, [element])

	const handleCreateUser: SubmitHandler<Response> = useCallback(async (values) => {
		isLoading = true;
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

		onClose();

		isLoading = false;
	}, [toast, onClose]);

	return (
		<Modal
			initialFocusRef={initialRef}
			finalFocusRef={finalRef}
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent mx={2}>
				<ModalHeader>Cadastrar Usuário</ModalHeader>
				<ModalCloseButton />
				<Box as="form" onSubmit={handleSubmit(handleCreateUser)}>
					<ModalBody pb={6}>
						<Input
							ref={initialRef}
							placeholder="Nome"
							error={errors.name}
							{...register('name')}
						/>

						<Input
							mt={4}
							placeholder="E-mail"
							error={errors.email}
							{...register('email')}
						/>
					</ModalBody>

					<ModalFooter>
						<Button
							mr={3}
							isLoading={isLoading}
							colorScheme="cyan"
							type="submit"
						>
							Guardar
						</Button>

						<Button onClick={onClose}>Cancelar</Button>
					</ModalFooter>
				</Box>
			</ModalContent>
		</Modal>
	)
}