import { useEffect, useState } from 'react';

import {
    Flex,
    Box,
    Table,
    Button,
    IconButton,
    useColorMode,
    useColorModeValue,
    useBreakpointValue,
    BoxProps,
    Text,
    Icon,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

import Row from './Row';
import Misc from './Misc';
import { Model as ModelType, Row as RowType } from '../../constants';
import { useRouter } from 'next/router';
import { userService } from '../../services';

type HeaderRow = {
    key: string;
    label: string;
}
interface DatatableProps extends BoxProps {
    header?: string;
    data: ModelType[] | RowType[];
    header_rows: HeaderRow[];
    current_page: number,
    total: number;
    onPageChange: (page: number) => {}
};

const Datatable = ({ header, header_rows, data, current_page, total, onPageChange, ...rest }: DatatableProps) => {
    const router = useRouter();
    const { colorMode, toggleColorMode } = useColorMode();
    const borderColor = useColorModeValue("gray.200", "gray.600");

    const [valueSearch, setValueSearch] = useState('');

    let key_from_path = router.pathname.split("/")[1];
    key_from_path = (key_from_path == '' ? 'home' : key_from_path);

    const isMdVerison = useBreakpointValue({
        base: false,
        md: true,
    });
    const asButton = useBreakpointValue({ base: IconButton, md: Button })

    const handleSearchUser = async (value: string) => {
        // TODO: Peticion de busqueda
    }

    return (
        <Box
            flex="1"
            p="4"
            bg={colorMode === "light" ? "white" : "gray.700"}
            borderRadius="md"
        >
            <Misc.Heading
                header={header}
            />
            <Flex
                justify="space-between"
                align="center"
                py="2"
            >
                <Flex
                    flex="1"
                    direction="row"
                    align="center"
                    border="1px"
                    borderRadius="md"
                    borderColor={borderColor}
                >
                    <Misc.Searchbar
                        text={valueSearch}
                        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleSearchUser(e.target.value);
                            setValueSearch(e.target.value);
                        }}
                        onSearch={() => handleSearchUser(valueSearch)}
                    />
                </Flex>
                <Button
                    onClick={(e) => {
                        e.preventDefault()
                        router.push(`/${key_from_path}/create`)
                    }}
                    as={asButton}
                    ml="4"
                    size="sm"
                    fontSize="sm"
                    colorScheme="cyan"
                    leftIcon={<Icon as={FaPlus} fontSize="16" />}
                    icon={<Icon as={FaPlus} fontSize="16" />}
                    title="Crear"
                >
                    {isMdVerison && <Text>{"Crear"}</Text>}
                </Button>
            </Flex>
            <Box
                border="1px"
                borderRadius="sm"
                borderColor={borderColor}
            >
                <Table>
                    <Row.Header
                        header_rows={header_rows}
                    />
                    <Row.Body
                        header_rows={header_rows}
                        data={data}
                    />
                    <Row.Footer
                        current_page={current_page}
                        total={total}
                        onPageChange={onPageChange}
                        {...rest}
                    />
                </Table>
            </Box>
        </Box>

    )
}

export default Datatable