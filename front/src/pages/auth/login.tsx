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

const Login = () => {
	const [show, setShow] = useState(false)
	const handleClick = () => setShow(!show)

	return <Flex
		minH={'100vh'}
		align={'center'}
		justify={'center'}
		bg={useColorModeValue('gray.50', 'gray.800')}>
		<Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6}>
			<Stack align={'center'}>
				<Heading fontSize={'4xl'}>Iniciar sesión con una cuenta</Heading>
				<Text fontSize={'lg'} color={'gray.500'}>
					para disfrutar las <Link href={"/features"} passHref><ChakraLink color={'blue.500'}>caracteristicas personalizadas</ChakraLink></Link> ✌️
				</Text>
			</Stack>
			<Box
				rounded={'lg'}
				bg={useColorModeValue('white', 'gray.700')}
				boxShadow={'lg'}
				p={8}>
				<Stack spacing={4}>
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
				</Stack>
			</Box>
		</Stack>
	</Flex>
}

export default Login
