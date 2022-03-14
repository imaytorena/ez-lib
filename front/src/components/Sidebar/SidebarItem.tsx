import React, { ReactText } from 'react';
import {
	Flex,
	FlexProps,
	Icon
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import Link from 'next/link';
interface SidebarItemProps extends FlexProps {
	icon: IconType;
	isActive: boolean;
	path: string;
	children: ReactText;
}

export const SidebarItem = ({ icon, children, isActive, path, ...rest }: SidebarItemProps) => {
	return (
		<Link href={path}>
			<Flex
				align="center"
				p="4"
				mx="4"
				borderRadius="lg"
				role="group"
				cursor="pointer"
				_hover={{
					bg: isActive ? 'cyan.400' : 'gray.300',
					color: 'white',
				}}
				bg={isActive && 'cyan.400'}
				color={isActive && 'white'}
				{...rest}>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: 'white',
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	);
};
