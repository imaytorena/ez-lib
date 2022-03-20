import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import { Select as ChakraSelect, SelectProps as ChakraSelectProps } from '@chakra-ui/react'
import { ElementFormControl } from './ElementFormControl'
import { FieldError } from 'react-hook-form';

type Item = {
    label: string;
    value: string;
}
interface SelectProps extends ChakraSelectProps {
	name: string;
	label?: string;
	options: Item[];
	isRequired?: boolean;
	ref?: React.LegacyRef<HTMLInputElement>;
	error?: FieldError;
}
const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
    { name, label, error = null, isRequired = false, options, ...rest },
	ref
) => (
    <ElementFormControl
        label={label}
        name={name}
        error={error}
        isRequired={isRequired}
    >
        <ChakraSelect
            id={name}
            name={name}
            {...rest}

            focusBorderColor={error ? "red" : "cyan.500"}
            ref={ref}
        >
            {options.map((option, index) => (<option key={`${option.value}-${index}`} value={option.value}>{option.label}</option>))}
        </ChakraSelect>
    </ElementFormControl>
)

export const Select = forwardRef(SelectBase);