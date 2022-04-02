// import AdminLayout from '../components/AdminLayout';
import {
	Button,
	Flex,
	Heading,
	Image,
	Stack,
	Text,
	Link as ChakraLink,
	useBreakpointValue,
	useColorMode,
} from '@chakra-ui/react';
import Link from 'next/link';
import SwitchTheme from '../components/Misc/SwitchTheme';

export default function Home() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
			<Flex p={8} flex={1} align={'center'} justify={'center'}>
				<Stack spacing={6} w={'full'} maxW={'lg'}>
					<Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
						<Text
							as={'span'}
							position={'relative'}
							_after={{
								content: "''",
								width: 'full',
								height: useBreakpointValue({ base: '20%', md: '30%' }),
								position: 'absolute',
								bottom: 1,
								left: 0,
								bg: 'blue.400',
								zIndex: -1,
							}}>
							EASY LIBRARY
						</Text>
						<br />{' '}
						<Text fontSize={35} color={'blue.400'} as={'span'}>
							Bibliotecario web
						</Text>{' '}
					</Heading>
					<Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
						Sistema administrador de una biblioteca escolar.
						<br />
						Creado por estudiantes de la universidad de Guadalajara.
					</Text>
					<Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
						<Link href={"/auth/login"}>
							<Button
								rounded={'full'}
								bg={'blue.500'}
								color={'white'}
								_hover={{
									bg: 'blue.600',
								}}>
								Ingresar o Crear una cuenta
							</Button>
						</Link>
						<Link href={"/public/books"}>
							<Button rounded={'full'}>
								Explorar catalogo
							</Button>
						</Link>
					</Stack>
					<br />
					<Text fontSize={{ base: 'xs', lg: 'sm' }} color={'gray.500'}>
						Se pueden aplicar términos adicionales. Al usar este sitio, usted acepta los <Link href={"/"} passHref><ChakraLink color={"blue.500"}>Términos de uso</ChakraLink></Link> y la <Link href={"/"} passHref><ChakraLink color={"blue.500"}>Política de privacidad</ChakraLink></Link>. EASYLIBRARY®
					</Text>

				</Stack>
			</Flex>
			<Flex flex={1}>
				<Image
					alt={'Login Image'}
					objectFit={'cover'}
					src={
						'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
					}
				/>
			</Flex>
			<SwitchTheme fixed />
		</Stack>
	)
}
