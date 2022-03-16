import { useState } from 'react';
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Link,
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
		<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
			<Stack align={'center'}>
				<Heading fontSize={'4xl'}>Sign in to your account</Heading>
				<Text fontSize={'lg'} color={'gray.600'}>
					to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
				</Text>
			</Stack>
			<Box
				rounded={'lg'}
				bg={useColorModeValue('white', 'gray.700')}
				boxShadow={'lg'}
				p={8}>
				<Stack spacing={4}>
					<FormControl id="email">
						<FormLabel>Email address</FormLabel>
						<Input type="email" />
					</FormControl>
					<FormControl id="password">
						<FormLabel>Password</FormLabel>
						<InputGroup>
							<Input
								pr='4.5rem'
								type={show ? 'text' : 'password'}

							// focusBorderColor={error ? "red" : "cyan.500"}
							/>
							<InputRightElement width='4.5rem'>
								<Button h='1.75rem' size='sm' onClick={handleClick}>
									{show ? 'Hide' : 'Show'}
								</Button>
							</InputRightElement>
						</InputGroup>
					</FormControl>
					<Stack spacing={10}>
						<Stack
							direction={{ base: 'column', sm: 'row' }}
							align={'start'}
							justify={'space-between'}>
							<Checkbox>Remember me</Checkbox>
							<Link color={'blue.400'}>Forgot password?</Link>
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
				</Stack>
			</Box>
		</Stack>
	</Flex>
}

export default Login
