import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Button, useColorMode } from '@chakra-ui/react';
import React from 'react'

const SwitchTheme = ({ fixed }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        fixed ? <Button
            maxWidth={120}
            my="4"
            ml="auto"
            onClick={toggleColorMode}
        >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        : <Button
            bg={"blue.500"}
            color={"white"}
            borderColor={"white"}
            _hover={{ bg: "blue.600" }}
            _active={{ bg: "blue.500" }}
            position={"fixed"}
            zIndex={12}
            top={10}
            right={10}
            onClick={toggleColorMode}
        >
            {/* <Box mr={2}>Tema</Box> */}
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
    )
}

export default SwitchTheme