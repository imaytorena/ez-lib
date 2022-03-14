import { forwardRef, ForwardRefRenderFunction } from 'react';

import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from '@chakra-ui/react'

import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  ref?: React.LegacyRef<HTMLInputElement>;
  error?: FieldError;
}
const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, isRequired = false, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>
        {label}
        {isRequired && <Box as="span" color="red"> *</Box>}
      </FormLabel>}

      <ChakraInput
        name={name}
        id={name}
        focusBorderColor={error ? "red" : "cyan.500"}
        ref={ref}
        {...rest}
      />

      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}

    </FormControl>
  )
}

export const Input = forwardRef(InputBase);