import { BoxProps, Heading as ChakraHeading, useColorMode } from '@chakra-ui/react'
import React from 'react'

interface HeadingProps extends BoxProps {
    header: string;
};
const Heading = ({ label }: HeadingProps) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <ChakraHeading
            py="2"
            fontSize={["sm", "lg", "xl"]}
            fontWeight="black"
            color={colorMode === "light" ? "gray.600" : "gray.200"}
        >
            {label}
        </ChakraHeading>
    )
}

export default Heading