import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";
import { loanService } from "../../services";
import {useState} from "react";
import {CustomRowProps} from "../../constants";
import {Td, Text, Tooltip} from "@chakra-ui/react";

function Loans({ loans }) {
	const [loansData, setLoansData] = useState(loans);

	const onPageChange = async (page) => {
		await loanService.getList({ page: page })
			.then(function (response) {
				if (response.status == 200) {
					setLoansData(response.data)
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
				{ key: 'object_type', label: 'Objeto prestado' },
			]}
			onPageChange={onPageChange}
			{...loansData}
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
