import { Box, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Card = ({ children, ...rest }) => {
    return (
        <Box
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'1xs'}
            rounded={'lg'}
            p={6}
            m={4}
            w={'min-content'}
            textAlign={'center'}
        >
            {children}
        </Box>
    )
}

export default Card