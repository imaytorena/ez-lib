import { useEffect, useState } from 'react';

import {
    Flex,
    Box,
    Table,
    Button,
    IconButton,
    useToast,
    useColorMode,
    useColorModeValue,
    useBreakpointValue,
    BoxProps,
    Text,
    Icon,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { FormModal } from '../../components/FormModal';

import Row from './Row';
import Misc from './Misc';
import { Book, Row as RowType, User } from '../../constants';

export type Model = RowType | Book | User | undefined;

type HeaderRow = {
    key: string;
    label: string;
}
interface DatatableProps extends BoxProps {
    header?: string;
    data: Model[];
    header_rows: HeaderRow[];
    totalCount: number;
};

const Datatable = ({ header, header_rows, data, totalCount }: DatatableProps) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const borderColor = useColorModeValue("gray.200", "gray.600");

    const toast = useToast();

    const [page, setPage] = useState(1);
    const [selectedElement, setSelectedElement] = useState(null);
    const [valueSearch, setValueSearch] = useState('');
    const [isOpenFormModal, setIsOpenFormModal] = useState(false);

    const isLgVerison = useBreakpointValue({
        base: false,
        lg: true,
    });
    const isMdVerison = useBreakpointValue({
        base: false,
        md: true,
    });
    const asButton = useBreakpointValue({ base: IconButton, md: Button })

    useEffect(() => {
        // TODO: Metodo parametro page 
    }, [page])

    const handleToggleFormModal = () => {
        setIsOpenFormModal(!isOpenFormModal);
    }

    const handleCreate = async () => {
        setSelectedElement(null);
        setIsOpenFormModal(!isOpenFormModal);
    }

    const handleUpdate = async (element) => {
        setSelectedElement(element);
        setIsOpenFormModal(!isOpenFormModal);
    }

    const handleDelete = async (element) => {
        // TODO: Peticion de eliminación
        // await deleteUser(user.id);

        // toast({
        //     description: `${user.name} eliminado exitosamente.`,
        //     status: "success",
        //     position: "top",
        //     duration: 4000,
        //     isClosable: true,
        // });
    }

    const handleSearchUser = async (value: string) => {
        // TODO: Peticion de busqueda
    }

    return (
        <Flex
            w="100%"
            maxWidth={1220}
            mx="auto"
            px="6"
            my="6"
            direction="column"
        >
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
                                // console.log(e.target.value)
                                handleSearchUser(e.target.value);
                                setValueSearch(e.target.value);
                            }}
                            onSearch={() => handleSearchUser(valueSearch)}
                        />
                    </Flex>
                    <Button
                        onClick={handleCreate}
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
                    <FormModal
                        element={selectedElement}
                        isOpen={isOpenFormModal}
                        onClose={handleToggleFormModal}
                    />

                </Flex>
                <Box
                    border="1px"
                    borderRadius="sm"
                    borderColor={borderColor}
                >
                    <Table size="sm">
                        <Row.Header
                            header_rows={header_rows}
                        />
                        <Row.Body
                            header_rows={header_rows}
                            data={data}
                        />
                        <Row.Footer totalCount={totalCount} page={page} setPage={setPage} />
                    </Table>
                </Box>
            </Box>
        </Flex>

    )
}

export default Datatable