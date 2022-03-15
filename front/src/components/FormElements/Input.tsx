import { forwardRef, ForwardRefRenderFunction, useState } from 'react';

import {
	Button,
	Input as ChakraInput,
	InputGroup,
	InputProps as ChakraInputProps,
	InputRightElement
} from '@chakra-ui/react'
import ElementFormControl from './ElementFormControl';

import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
	name: string;
	label?: string;
	isRequired?: boolean;
	disabled?: boolean;
	ref?: React.LegacyRef<HTMLInputElement>;
	error?: FieldError;
}

const PasswordInputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
	{ name, label, error = null, isRequired = false, disabled = false, ...rest },
	ref
) => {
	const [show, setShow] = useState(false)
	const handleClick = () => setShow(!show)

	return (
		<ElementFormControl
			label={label}
			name={name}
			error={error}
			isRequired={isRequired}
		>
			<InputGroup>
				<ChakraInput
					pr='4.5rem'
					id={name}
					name={name}
					type={show ? 'text' : 'password'}

					disabled={disabled}

					focusBorderColor={error ? "red" : "cyan.500"}
					ref={ref}

					{...rest}
				/>
				<InputRightElement width='4.5rem'>
					<Button h='1.75rem' size='sm' onClick={handleClick} disabled={disabled}>
						{show ? 'Hide' : 'Show'}
					</Button>
				</InputRightElement>
			</InputGroup>
		</ElementFormControl>

	)
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
	{ name, label, error = null, isRequired = false, ...rest },
	ref
) => {
	return (
		<ElementFormControl
			label={label}
			name={name}
			error={error}
			isRequired={isRequired}
		>
			<ChakraInput
				name={name}
				id={name}
				focusBorderColor={error ? "red" : "cyan.500"}
				ref={ref}
				{...rest}
			/>
		</ElementFormControl>
	)
}

export const Input = forwardRef(InputBase);
export const PasswordInput = forwardRef(PasswordInputBase);