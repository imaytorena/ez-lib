import { useState } from 'react';
import Link from 'next/link';
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Link as ChakraLink,
	Button,
	Heading,
	Text,
	useColorModeValue,
	InputGroup,
	InputRightElement,
} from '@chakra-ui/react';
import { AuthContainer, HeaderText, FormContainer } from '../../components/Pages/Auth';

const Login = () => {
	const [show, setShow] = useState(false)
	const handleClick = () => setShow(!show)

	return <AuthContainer>
		<HeaderText title={"Iniciar sesión con una cuenta"} />
		<FormContainer>
			<FormControl id="email">
				<FormLabel>Correo Electrónico</FormLabel>
				<Input type="email" />
			</FormControl>
			<FormControl id="password">
				<FormLabel>Contraseña</FormLabel>
				<InputGroup>
					<Input
						pr='4.5rem'
						type={show ? 'text' : 'password'}
					/>
					<InputRightElement width='4.5rem'>
						<Button h='1.75rem' size='sm' onClick={handleClick}>
							{show ? 'Ocultar' : 'Mostrar'}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>
			<Stack spacing={10}>
				<Stack
					direction={{ base: 'column', sm: 'row' }}
					align={'start'}
					justify={'space-between'}>
					<Checkbox>Recordar mi sesión</Checkbox>
					<ChakraLink color={'blue.500'}>Olvidé mi contraseña</ChakraLink>
				</Stack>
				<Button
					bg={'blue.400'}
					color={'white'}
					_hover={{
						bg: 'blue.500',
					}}>
					Sign in
				</Button>
			</Stack>
			<Stack pt={6}>
				<Text align={'center'}>
					<Link href={"/auth/signup"} passHref><ChakraLink color={'blue.500'}>No cuento con un usuario</ChakraLink></Link>
				</Text>
			</Stack>
		</FormContainer>
	</AuthContainer>
}

export default Login
