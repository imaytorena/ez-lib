import React, { useState } from 'react'
import {
	Heading,
	Text,
	Stack,
	useColorModeValue,
	HStack,
	Image,
	VStack,
	Spacer,
	Divider,
	Box,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverArrow,
	PopoverBody,
	useColorMode,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
} from '@chakra-ui/react';

import { Book as BookType } from '../../../constants';
import { CardElements } from '../../Elements';
import { useRouter } from 'next/router';

interface BookCardProps extends BookType {
	copies?: string[];
}
const BookCard = ({ id, title, description, autor, publisher, isbn, year, genre, available, stock, }: BookCardProps) => {
	const { colorMode } = useColorMode();
	const [ copyDrawer, setCopyDrawer] = useState({ open: false, data: null});
	const router = useRouter();

	const copies = [
		{ id: "1", name: "2da Edicion", return_date: "20 Marzo 2022", details: "Pasta gruesa, portada color verde letras negras" },
		{ id: "2", name: "Pasta gruesa", return_date: "20 Marzo 2022", details: "Pasta blanda, portada color verde letras negras" },
		{ id: "3", name: "2da Edicion", return_date: "20 Marzo 2022", details: "Pasta blanda, portada color verde letras negras" },
		{ id: "4", name: "2da Edicion", return_date: "20 Marzo 2022", details: "Pasta blanda, portada color blanco letras negras" },
		{ id: "5", name: "2da Edicion", return_date: "DISPONIBLE", details: "Pasta blanda, portada color blanco letras negras" },
		{ id: "6", name: "3ra Edicion", return_date: "DISPONIBLE", details: "Pasta gruesa, portada color blanco letras negras" },
		{ id: "7", name: "4ta Edicion", return_date: "20 Marzo 2022", details: "Pasta gruesa, engargolado" },
	]

	return (
		<CardElements.Container>
			<VStack align={"center"} mt={8} spacing={10}>
				{/* TODO: Validar en el backend el ancho de las imagenes, para que siempre sean portrait nunca landscape */}
				<Box boxSize='xs'>
					<Image
						height={"xs"}
						width={"auto"}
						margin={"auto"}
						src='https://images-na.ssl-images-amazon.com/images/I/91oy4zw56KL.jpg'
						alt='Dan Abramov'
					/>
				</Box>
				<Heading fontSize={'4xl'} fontFamily={'body'}>
					{title}
				</Heading>
				<Text fontWeight={500} color={'gray.500'}>
					{autor} | {publisher} {year}
				</Text>
				<Divider />
				<Text fontWeight={800} color={'gray.500'}>
					{description}
				</Text>

				<Stack align={'center'} justify={'center'} direction={'row'}>
					<CardElements.Badge text={`ISBN: ${isbn}`} />
					<CardElements.Badge text={`AÑO DE PUBLICACIÓN: ${year}`} />
					<CardElements.Badge text={`GENERO: ${genre}`} />
					<CardElements.Badge text={`${parseInt(available) ? "" : "NO"} DISPONIBLE`} />
					<CardElements.Badge text={`${stock} EXISTENCIAS`} />
				</Stack>
				<Divider />
				{copies.length && <Box w={"100%"}>
						<Text fontWeight={800}>Ejemplares</Text>
						<br/>
						<Table size='sm'>
							<Thead>
								<Tr>
									<Th>Ejemplar</Th>
									<Th>Fin del prestamo</Th>
								</Tr>
							</Thead>
							<Tbody>
								{copies.map((copy, index) => <Tr
									key={`${copy.id}-${index}`}
									_hover={{
										cursor: "pointer",
										bg: `${colorMode === "light" ? "gray.50" : "gray.800"}`
									}}
									onClick={()=>{ setCopyDrawer({ open: true, data: copy})}}
								>
									<Td>
										<Text>{copy.name}</Text>
									</Td>
									<Td>
										<Text>{copy.return_date}</Text>
									</Td>
								</Tr>
								)}
							</Tbody>
						</Table>
					</Box>}
			</VStack>
			<Divider />
			<HStack justify={"center"} mt={20}>
				<CardElements.BadgeButton
					onClick={() => { router.push(`/books/${id}/edit`) }}
					text="Editar"
					baseColor="cyan"
				/>
				<CardElements.BadgeButton
					onClick={() => { router.push(`/books/${id}/delete`) }}
					text="Eliminar"
					baseColor="red"
				/>
			</HStack>
			<Drawer
				size='sm'
				isOpen={copyDrawer.open}
				placement='right'
				onClose={()=>{ setCopyDrawer({ open: false, data: null})}}
			>
				<DrawerOverlay />
				<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>{`Ejemplar de ${title}`}</DrawerHeader>

				<DrawerBody>
					{copyDrawer.data?.name}
					<Divider/>
					<br/>
					{copyDrawer.data?.details}
					<br/>
					<br/>
					Usuario:
						Juan perez
				</DrawerBody>
				</DrawerContent>
			</Drawer>
		</CardElements.Container>
	)
}

export default BookCard