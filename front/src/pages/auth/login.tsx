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
import { AuthContainer, HeaderText, FormContainer, SwitchRoute } from '../../components/Pages/Auth';
import LoginForm from '../../components/Pages/Auth/LoginForm';
import SwitchTheme from '../../components/Misc/SwitchTheme';

const Login = () => {
	const [show, setShow] = useState(false)
	const handleClick = () => setShow(!show)

	return <>
		<AuthContainer>
			<HeaderText title={"Iniciar sesión con una cuenta"} />
			<FormContainer>
				<LoginForm />
				<SwitchRoute
					text={"No cuento con un usuario"}
					pathTo={"/auth/signup"}
				/>
			</FormContainer>
		</AuthContainer>
		<SwitchTheme />
	</>
}

export default Login
