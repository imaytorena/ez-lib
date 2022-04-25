import React from 'react'
import {
    Box,
    VStack,
    Button,
    Flex,
    Divider,
    chakra,
    Grid,
    GridItem,
    Container,
    Text,
    Link as ChakraLink,
    HStack,
    useColorModeValue,
} from '@chakra-ui/react';
import Link from "next/link";
import { reportService } from '../../../services';

interface ModuleProps {
    title: string;
    path: string;
    color: string;
};
const Module = ({ title, path, color }: ModuleProps) => {
    const getFile = async (t: string) => {
        await reportService.get(path, t);
    }
    return (
        <Box
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'1xs'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}
        >
            <VStack alignItems="flex-start" spacing="20px">
                <chakra.h2 fontSize="2xl" fontWeight="700">
                    {title}
                </chakra.h2>
            </VStack>
            <HStack spacing='24px' my={4}>
                <Button colorScheme={color} onClick={() => { getFile('xlsx') }}>
                    Descargar Excel
                </Button>
                <Button colorScheme={color} onClick={() => { getFile('csv') }}>
                    Descargar CSV
                </Button>
                {/* <Button colorScheme={color}>
                    Imprimir
                </Button> */}
            </HStack>
        </Box>
    )
}

export default Module