import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";
import { feeService } from "../../services";
import {useState} from "react";

function Fees({ fees, error }) {
	const [feesData, setFeesData] = useState(fees);

	const onPageChange = async (page) => {
		await feeService.getList({ page: page })
			.then(function (response) {
				if (response.status == 200) {
					setFeesData(response.data)
				}
			})
			.catch(async (errors) => {
				console.error(errors.response?.data);
			});
	}

	return <AdminLayout>
		<Datatable
			header={'Cobros o cargos'}
			header_rows={[
				{ key: 'title', label: 'Titulo' },
				{ key: 'description', label: 'Descripción' },
				{ key: 'autor', label: 'Autor' },
				{ key: 'publisher', label: 'Editorial' },
				{ key: 'isbn', label: 'ISBN' },
				{ key: 'year', label: 'Año' },
				{ key: 'genre', label: 'Género' },
				{ key: 'available', label: 'Disponibilidad' },
				{ key: 'stock', label: 'stock' },
			]}
			onPageChange={onPageChange}
			{...feesData}
		/>
	</AdminLayout>;
}

export async function getServerSideProps() {
	let fees = null, error = null;

	await feeService.getList()
		.then(function (response) {
			// console.log(response)
			if (response.status == 200) {
				fees = response.data;
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
			fees,
			error
		},
	}
}

export default Fees;