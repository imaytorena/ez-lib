import {
	Box,
	FormControl,
	FormErrorMessage,
	FormLabel
} from '@chakra-ui/react'

export const ElementFormControl = ({ label, name, error, isRequired, children }) => {
	return <FormControl isInvalid={!!error} pb={!error?.message ? 8 : 2}>
		{!!label && <FormLabel htmlFor={name}>
			{label}
			{isRequired && <Box as="span" color="red"> *</Box>}
		</FormLabel>}
		{children}
		{!!error && (
			<FormErrorMessage>
				{error.message}
			</FormErrorMessage>
		)}
	</FormControl>

}