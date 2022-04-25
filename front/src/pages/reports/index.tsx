import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";
import { bookService } from "../../services";
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
	SimpleGrid,
	Heading,
} from '@chakra-ui/react';
import Module from "../../components/Pages/Reports/Module";

function Reports({ reports }) {
	const modules = [
		{
			title: "Usuarios",
			path: "users",
			color: "teal",
		},
		{
			title: "Roles y permisos",
			path: "roles_permissions",
			color: "teal",
		},
		{
			title: "Libros",
			path: "books",
			color: "blue",
		},
		{
			title: "Ejemplares",
			path: "copies",
			color: "blue",
		},
		{
			title: "Materiales",
			path: "materials",
			color: "blue",
		},
		{
			title: "Préstamos",
			path: "loans",
			color: "green",
		},
		{
			title: "Penalizaciones",
			path: "penalties",
			color: "pink",
		},
		{
			title: "Cobros",
			path: "fees",
			color: "purple",
		},
	];
	return <AdminLayout>
		<Heading as='h3' size='lg' mb={5}>Reportes</Heading>
		<Box
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'1xs'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}
        >
            <HStack spacing='24px' my={4}>
                <Button colorScheme="blue" disabled>
                    Descargar todo en Excel
                </Button>
                <Button colorScheme="blue" disabled>
					Descargar todo en CSV
                </Button>
                <Button colorScheme="blue" disabled>
                    Imprimir todo
                </Button>
            </HStack>
        </Box>
		<Divider my={5}/>
		<SimpleGrid columns={2} spacing={10}>
			{modules.map((module, index) => <Module key={index} {...module} />)}
		</SimpleGrid>
	</AdminLayout>;
}

export default Reports
