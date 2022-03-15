import React from 'react'
import {
    Heading,
    Avatar as ChakraAvatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge as ChakraBadge,
    useColorModeValue,
} from '@chakra-ui/react';

const Container = ({ children }) => <Box
    w={'70%'}
    bg={useColorModeValue('white', 'gray.900')}
    boxShadow={'2xl'}
    rounded={'lg'}
    p={20}
    textAlign={'center'}
    m={"auto"}
>{children}</Box>

const Avatar = ({ src }) => <ChakraAvatar
    size={'xl'}
    src={src}
    mb={4}
    pos={'relative'}
    _after={{
        content: '""',
        w: 4,
        h: 4,
        bg: 'green.300',
        border: '2px solid white',
        rounded: 'full',
        pos: 'absolute',
        bottom: 0,
        right: 3,
    }}
/>

const Badge = ({ text }) => <ChakraBadge
    px={2}
    py={1}
    bg={useColorModeValue('gray.50', 'gray.800')}
    fontWeight={'400'}>
    {text}
</ChakraBadge>

const BadgeButton = ({ href, text, baseColor }) => <Link href={href}><Button
    flex={1}
    fontSize={'sm'}
    rounded={'full'}
    bg={`${baseColor}.400`}
    color={'white'}
    boxShadow={
        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
    }
    _hover={{
        bg: `${baseColor}.500`,
    }}
    _focus={{
        bg: `${baseColor}.500`,
    }}
>{text}</Button></Link>

export const CardElements = {
    Container,
    Avatar,
    Badge,
    BadgeButton,
}