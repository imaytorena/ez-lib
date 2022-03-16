import React from 'react';
import {
	IconButton,
	Avatar,
	Box,
	Flex,
	HStack,
	VStack,
	useColorModeValue,
	Text,
	FlexProps,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Button,
	useColorMode,
} from '@chakra-ui/react';
import {
	FiMenu,
	FiBell,
	FiChevronDown,
} from 'react-icons/fi';

interface MobileProps extends FlexProps {
	onOpen: () => void;
}
export const Navbar = ({ onOpen, ...rest }: MobileProps) => {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			borderBottomWidth="1px"
			justifyContent={{ base: 'space-between', md: 'flex-end' }}
			{...rest}>
			<IconButton
				display={{ base: 'flex', md: 'none' }}
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
				icon={<FiMenu />}
			/>

			<Text
				display={{ base: 'flex', md: 'none' }}
				fontSize="2xl"
				fontFamily="monospace"
				fontWeight="bold">
				Logo
			</Text>

			<HStack spacing={{ base: '0', md: '6' }}>
				<Button
					maxWidth={120}
					my="4"
					ml="auto"
					onClick={toggleColorMode}
				>
					Tema {colorMode === "light" ? "Dark" : "Light"}
				</Button>
				<IconButton
					size="lg"
					variant="ghost"
					aria-label="open menu"
					icon={<FiBell />}
				/>
				<Flex alignItems={'center'}>
					<Menu>
						<MenuButton
							py={2}
							transition="all 0.3s"
							_focus={{ boxShadow: 'none' }}>
							<HStack>
								<Avatar
									size={'sm'}
									src={'http://www.fcaktp.cu/wp-content/uploads/2019/05/default-user-image.png'}
								/>
								<VStack
									display={{ base: 'none', md: 'flex' }}
									alignItems="flex-start"
									spacing="1px"
									ml="2">
									<Text fontSize="sm">Justina Clark</Text>
									<Text fontSize="xs" color="gray.600">
										Admin
									</Text>
								</VStack>
								<Box display={{ base: 'none', md: 'flex' }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList
							zIndex={3}
						>
							<MenuItem>Profile</MenuItem>
							<MenuItem>Settings</MenuItem>
							<MenuItem>Billing</MenuItem>
							<MenuDivider />
							<MenuItem>Sign out</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	);
};