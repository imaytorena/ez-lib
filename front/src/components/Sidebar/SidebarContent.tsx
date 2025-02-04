import React, { useContext } from "react";
import {
	Box,
	useColorModeValue,
	BoxProps,
	CloseButton,
	Flex,
	Text,
} from "@chakra-ui/react";

import { SidebarItem } from "./SidebarItem";
import { useRouter } from "next/router";
import { routes } from "../../constants/routes";

interface SidebarProps extends BoxProps {
	onClose: () => void;
}
export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	const router = useRouter();

	let key_from_path = router.pathname.split("/")[1];
	key_from_path = (key_from_path == '' ? 'home' : key_from_path);

	return (
		<Box
			transition="3s ease"
			bg={useColorModeValue("white", "gray.900")}
			borderRight="1px"
			borderRightColor={useColorModeValue("gray.200", "gray.700")}
			w={{ base: "full", md: 60 }}
			pos="fixed"
			h="full"
			{...rest}
		>
			<Flex
				h="20"
				alignItems="center"
				mx="8"
				justifyContent="space-between"
			>
				<Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
					Logo
				</Text>
				<CloseButton
					display={{ base: "flex", md: "none" }}
					onClick={onClose}
				/>
			</Flex>
			{Object.values(routes).map((link) => (
				<SidebarItem
					key={link.key}
					icon={link.icon}
					isActive={link.key == key_from_path}
					path={link.path}
				>
					{link.label}
				</SidebarItem>
			))}
		</Box>
	);
};
