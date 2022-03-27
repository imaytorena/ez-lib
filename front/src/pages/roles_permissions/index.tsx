import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";
import { roleService } from "../../services";

function RolesPermissions({ roles, error }) {
	const [rolesData, setRolesData] = useState(roles);
	const [roleModalData, setRoleModalData] = useState({});
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const getRoleData = async (id) => {
		await roleService.getById(id)
			.then(function (response) {
				if (response.status == 201) {
					console.log(response.data?.role);
					setRoleModalData(response.data?.role)
				}
			})
			.catch(async (errors) => {
				console.error(errors.response?.data);
			});
	}

	useEffect(() => {
		if (error) {
			toast({
				description: error?.message,
				status: "error",
				position: "bottom",
				duration: 4000,
				isClosable: true,
			});
		}
	}, [error, toast]);

	const onPageChange = async (page) => {
		await roleService.getAll({ page: page })
			.then(function (response) {
				if (response.status == 200) {
					setRolesData(response.data?.roles)
				}
			})
			.catch(async (errors) => {
				console.error(errors.response?.data);
			});
	}

	return <AdminLayout>
		<Datatable
			header={'Roles y Permisos'}
			header_rows={[
				{ key: 'name', label: 'Rol' },
				{ key: 'description', label: 'Descripción' },
				{ key: 'permissions_count', label: 'Permisos' },
			]}
			onClickRow={(header_rows, dr, index) => {
				getRoleData(dr["id"])
				onOpen();
			}}
			onPageChange={onPageChange}
			{...rolesData}
		></Datatable>
		{/* <Button onClick={onOpen}>Trigger modal</Button> */}

		<Modal onClose={onClose} isOpen={isOpen} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{roleModalData?.name}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{roleModalData?.description}
					<br/>
					<br/>
					permisos:
					<br/>
					<br/>
					<ul>
						{roleModalData?.permissions?.map(p => <li key={p.id}>
							{p.name} : {p.actions}
						</li>)}
					</ul>
					{/* <Lorem count={2} /> */}
				</ModalBody>
				<ModalFooter>
					{/* <Button onClick={onClose}>Close</Button> */}
				</ModalFooter>
			</ModalContent>
		</Modal>
	</AdminLayout>;
}

export async function getServerSideProps() {
	let roles = null, error = null;

	await roleService.getAll()
		.then(function (response) {
			if (response.status == 200) {
				roles = response.data?.roles;
			}
		})
		.catch(async (errors) => {
			error = errors.response?.data
		});

	return {
		props: {
			roles,
			error
		},
	}
}

export default RolesPermissions;
