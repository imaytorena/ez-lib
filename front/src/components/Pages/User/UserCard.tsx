import React from 'react'
import {
	Heading,
	Text,
	Stack,
	useColorModeValue,
	HStack,
} from '@chakra-ui/react';

import { CardElements } from './CardElements';
import { User as UserType } from '../../../constants';

interface UserCardProps extends UserType {
	history?: string[];
}
const generos = { "male": "Masculino", "female": "Femenino", "other": "Otro" };
const UserCard = ({ id, username, code, email, name, last_name, genre, history }: UserCardProps) => {
	return (
		<CardElements.Container>
			<CardElements.Avatar
				src={'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'}
			/>
			<Heading fontSize={'2xl'} fontFamily={'body'}>
				{name} {last_name}
			</Heading>
			<Text fontWeight={600} color={'gray.500'} mb={4}>
				@{username}
			</Text>
			<Text
				textAlign={'center'}
				color={useColorModeValue('gray.700', 'gray.400')}
				px={3}
			>
				{history ? history : <i>{"Este usuario no tiene historial"}</i>}
			</Text>

			<Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
				<CardElements.Badge text={code} />
				<CardElements.Badge text={email} />
				<CardElements.Badge text={generos[genre]} />
			</Stack>

			<HStack justify={"center"} mt={8} spacing={4}>
				<CardElements.BadgeButton
					href={`/notifications/${id}`}
					text="Enviar una notificación"
					baseColor="gray"
				/>
				<CardElements.BadgeButton
					href={`/users/${id}/edit`}
					text="Editar"
					baseColor="cyan"
				/>
				<CardElements.BadgeButton
					href={`/users/${id}/delete`}
					text="Eliminar"
					baseColor="red"
				/>
			</HStack>
		</CardElements.Container>
	)
}

export default UserCard