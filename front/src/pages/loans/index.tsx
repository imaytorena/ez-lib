import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";
import { loanService } from "../../services";
import {useState} from "react";
import {CustomRowProps} from "../../constants";
import {Td, Text, Tooltip} from "@chakra-ui/react";

const customRow = ({ header, data, index, ...rest }: CustomRowProps) => {
	let available = parseInt(data["available"]);
	return <Td
		key={`${header}-${index}`}
		{...rest}
	>
		<Text noOfLines={1}>
			{data["type"] == "App\\Models\\BookCopy" ? "Libro" : "Material"}
		</Text>
	</Td>
}

function Loans({ loans }) {
	const [booksData, setBooksData] = useState(loans);

	const onPageChange = async (page) => {
		await loanService.getList({ page: page })
			.then(function (response) {
				if (response.status == 200) {
					setBooksData(response.data)
				}
			})
			.catch(async (errors) => {
				console.error(errors.response?.data);
			});
	}
	return <AdminLayout>
		<Datatable
			header={'Prestamos'}
			header_rows={[
				{ key: 'username', label: 'Usuario' },
				{ key: 'status', label: 'Estatus' },
				{ key: 'details', label: 'Detalles' },
				{ key: 'type', label: 'Objeto prestado' },
			]}
			onPageChange={onPageChange}
			{...booksData}
		/>
	</AdminLayout>;
}

export async function getServerSideProps() {
	let loans = null, error = null;

	await loanService.getList()
		.then(function (response) {
			// console.log(response)
			if (response.status == 200) {
				loans = response.data;
			}
		})
		.catch(async (errors) => {
			// console.error(errors.response?.data)
			error = errors.response?.data
			if (errors.response.status == 403) {
				error = { status: 403, message: 'Usuario no autenticado' }
			}
		});

	return {
		props: {
			loans,
			error
		},
	}
}

export default Loans
