import React, { useContext } from "react";
import {
	Box,
	useColorModeValue,
	BoxProps,
	CloseButton,
	Flex,
	Text,
} from "@chakra-ui/react";

import {
	FiHome,
	FiTrendingUp,
	FiCompass,
	FiStar,
	FiSettings,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { NavItem } from "./NavItem";
import { admin_routes, RoutesContext } from "../AdminLayout";
import { useRouter } from "next/router";

interface LinkItemProps {
	name: string;
	icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
	{ name: "Home", icon: FiHome },
	{ name: "Trending", icon: FiTrendingUp },
	{ name: "Explore", icon: FiCompass },
	{ name: "Favourites", icon: FiStar },
	{ name: "Settings", icon: FiSettings },
];

interface SidebarProps extends BoxProps {
	onClose: () => void;
}
export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	const routes = admin_routes;

	const router = useRouter();
	const route = useContext(RoutesContext);

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
				<NavItem
					key={link.key}
					icon={link.icon}
					isActive={(link.key == router.pathname.split("/")[1])}
					path={link.path}
				>
					{link.label}
				</NavItem>
			))}
		</Box>
	);
};
