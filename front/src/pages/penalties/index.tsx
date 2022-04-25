import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";
import { penaltyService } from "../../services";
import {useState} from "react";

function Penalties({ penalties }) {
	const [penaltiesData, setPenaltiesData] = useState(penalties);

	const onPageChange = async (page) => {
		await penaltyService.getList({ page: page })
			.then(function (response) {
				if (response.status == 200) {
					setPenaltiesData(response.data)
				}
			})
			.catch(async (errors) => {
				console.error(errors.response?.data);
			});
	}

	return <AdminLayout>
		<Datatable
			header={'Penalizaciones'}
			header_rows={[
				{key: 'ticket_folio', label: 'Folio del ticket levantado'},
				{key: 'reason', label: 'Motivo'},
				{key: 'details', label: 'Detalles'},
				{key: 'total', label: 'Total'},
			]}
			onPageChange={onPageChange}
			{...penaltiesData}
		/>
	</AdminLayout>;
}

export async function getServerSideProps() {
	let penalties = null, error = null;

	await penaltyService.getList()
		.then(function (response) {
			// console.log(response)
			if (response.status == 200) {
				penalties = response.data;
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
			penalties,
			error
		},
	}
}

export default Penalties
