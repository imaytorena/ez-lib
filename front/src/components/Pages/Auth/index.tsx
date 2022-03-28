import { Stack, Heading, Text, Link as ChakraLink, useColorModeValue, Flex, Box } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const AuthContainer = ({ children }) => (
    <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} py={10} px={4}>
            {children}
        </Stack>
    </Flex>

)

const HeaderText = ({ title }) => (
    <Stack align={'center'}>
        <Heading fontSize={'4xl'} textAlign={'center'}>
            {title}
        </Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
            para disfrutar las <Link href={"/features"} passHref>
                <ChakraLink color={'blue.500'}>caracteristicas personalizadas</ChakraLink>
            </Link> ✌️
        </Text>
    </Stack>
)
const FormContainer = ({ children }) => (
    <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={6}>
            {children}
        </Stack>
    </Box>
)
const SwitchRoute = ({text, pathTo}) => (
    <Stack pt={6}>
        <Text align={'center'}>
            <Link href={pathTo} passHref>
                <ChakraLink color={'blue.400'}>{text}</ChakraLink>
            </Link>
        </Text>
    </Stack>
)
export { AuthContainer, HeaderText, FormContainer, SwitchRoute }