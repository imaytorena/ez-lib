import { BoxProps, Box, useColorMode, Flex, IconButton, Icon, Input, useColorModeValue } from '@chakra-ui/react'
import React, { ChangeEventHandler, MouseEventHandler } from 'react'
import { FaSearch } from 'react-icons/fa';

interface SearchbarProps extends BoxProps {
    text: string | undefined;
    onChangeText: ChangeEventHandler;
    onSearch: MouseEventHandler;
};
const Searchbar = ({ text, onChangeText, onSearch }: SearchbarProps) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const borderColor = useColorModeValue("gray.200", "gray.600");

    return (
        <>
            <IconButton
                size="sm"
                borderRadius="0"
                aria-label="pesquisar-usuario"
                icon={<Icon as={FaSearch} fontSize="16" />}
                onClick={onSearch}
            />

            <Input
                size="sm"
                border="0"
                focusBorderColor="cyan.500"
                placeholder="Pesquisar..."
                value={text}
                onChange={onChangeText}
            />
        </>
    )
}

export default Searchbar