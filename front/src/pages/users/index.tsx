import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";
import { userService } from "../../services/users";

function Users({ users, error }) {
	const [usersData, setUsersData] = useState(users);
	const toast = useToast();

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
	}, [error]);

    const onPageChange = (page) => {
        userService.getAll({page: page})
			.then(function (response) {
				if (response.status == 200) {
					setUsersData(response.data?.users)
				}
			})
    }

	return <AdminLayout>
		<Datatable
			header={'Usuarios'}
			header_rows={[
				{ key: 'username', label: 'Usuario' },
				{ key: 'code', label: 'Código' },
				{ key: 'email', label: 'Correo electrónico' },
				{ key: 'name', label: 'Nombre' },
				{ key: 'last_name', label: 'Apellido' },
				{ key: 'genre', label: 'Género' },
			]}
			onPageChange={onPageChange}
			{...usersData}
		></Datatable>
	</AdminLayout>;
}

export async function getStaticProps() {
	let users = null, error = null;

	await userService.getAll()
		.then(function (response) {
			if (response.status == 200) {
				users = response.data?.users;
			}
		})
		.catch(async (errors) => {
			error = errors.response?.data
		});

	return {
		props: {
			users,
			error
		},
	}
}

export default Users
