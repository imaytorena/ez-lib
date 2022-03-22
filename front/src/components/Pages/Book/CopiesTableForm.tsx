import React, { Dispatch, useCallback, useEffect, useState } from 'react'
import {
	Box,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	Input as ChakraInput,
	VStack,
	HStack,
	Button,
	Grid,
	GridItem,
	Spacer,
	Flex,
	Editable,
	EditablePreview,
	EditableInput,
	Icon,
	Divider
} from '@chakra-ui/react';
import { AddIcon, CopyIcon, DeleteIcon } from '@chakra-ui/icons';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Copy {
	id?: number;
	folio?: string;
	name?: string;
	features?: string;
}

interface CopiesTableFormProps {
	copies?: number;
	copiesState: Copy[];
	setCopiesState: Dispatch<Copy[]>
}
const CopiesTableForm = ({ copies, copiesState, setCopiesState }: CopiesTableFormProps) => {
	const { register, getValues, formState: { errors }, reset, setError, clearErrors } = useForm();
	const [copiesNumberState, setCopiesNumberState] = useState(null)

	useEffect(() => {
		setCopiesNumberState(copies);
	}, [copies]);


	const onDelete = (id) => {
		if (!!copiesState && copiesState.length) {
			let auxCopies = [...copiesState];

			let index = auxCopies.findIndex(copy => copy.id == id);
			auxCopies.splice(index, 1);

			setCopiesState(auxCopies);
		}
	}

	const onAdd = () => {
		let values = getValues();
		let emptyValues = false;

		clearErrors();
		Object.keys(values).forEach(key => {
			if (values[key] == "") {
				emptyValues = true;
				setError(key, {
					type: "manual",
					message: `El campo no puede ir vacio`,
				});
			}
		});

		if (!emptyValues) {
			let auxCopies = [...copiesState];
			let formValues = { ...values };

			formValues.id = !!copiesState.length ? copiesState[copiesState.length - 1]['id'] + 1 : 0;
			console.log(formValues);

			auxCopies.push(formValues);
			setCopiesState(auxCopies);

			reset({
				folio: "",
				name: "",
				features: "",
			})
		}
	}

	const onChange = (key, value, index) => {
		let auxCopies = copiesState;
		auxCopies[index][key] = value;

		setCopiesState(auxCopies);

	}

	return (copiesNumberState > 0 && <>
		<Divider />
		<VStack>
			<Text fontWeight={800} color={'gray.500'} my={3}>Ejemplares en existencia</Text>
			<Table>
				<Thead>
					<Tr>
						<Th>Folio</Th>
						<Th>Nombre</Th>
						<Th>Caracteristicas</Th>
						<Th></Th>
					</Tr>
				</Thead>
				<Tbody>
					{!!copiesState.length && copiesState.map((copy, index) => <Tr key={copy.id}>
						<Td>
							<Editable
								defaultValue={copy.folio}
								onChange={(value) => { onChange("folio", value, index) }}
							>
								<EditablePreview />
								<EditableInput />
							</Editable>
						</Td>
						<Td>
							<Editable
								defaultValue={copy.name}
								onChange={(value) => { onChange("name", value, index) }}
							>
								<EditablePreview />
								<EditableInput />
							</Editable>
						</Td>
						<Td>
							<Editable
								defaultValue={copy.features}
								onChange={(value) => { onChange("features", value, index) }}
							>
								<EditablePreview />
								<EditableInput />
							</Editable>
						</Td>
						<Td>
							<Button onClick={(e) => { onDelete(copy.id) }} >
								<Icon as={DeleteIcon} />
							</Button>
						</Td>
					</Tr>)}
					{<Tr>
						<Td>
							<ChakraInput
								isDisabled={copiesState.length >= copiesNumberState}
								placeholder='Ejemplo: 12345678'
								isInvalid={!!errors.folio}
								focusBorderColor={errors.folio ? "red.500" : "cyan.500"}

								{...register('folio')}
							/>
						</Td>
						<Td>
							<ChakraInput
								isDisabled={copiesState.length >= copiesNumberState}
								placeholder='Ejemplo: 2da edición'
								isInvalid={!!errors.name}
								focusBorderColor={errors.name ? "red.500" : "cyan.500"}

								{...register('name')}
							/>
						</Td>
						<Td>
							<ChakraInput
								isDisabled={copiesState.length >= copiesNumberState}
								placeholder='Ejemplo: Pasta gruesa'
								isInvalid={!!errors.features}
								focusBorderColor={errors.features ? "red.500" : "cyan.500"}

								{...register('features')}
							/>
						</Td>
						<Td>
							<Button
								isDisabled={copiesState.length >= copiesNumberState}
								onClick={onAdd}
							>
								<Icon as={AddIcon} />
							</Button>
						</Td>
					</Tr>}
				</Tbody>
			</Table>
		</VStack>
	</>)
}

export default CopiesTableForm