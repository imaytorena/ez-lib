import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";
import { bookService } from "../../services";

function Penalties({ penalties }) {
	return <AdminLayout>
		<Datatable
			header={'Penalizaciones'}
			header_rows={[
				{key: 'ticket_folio', label: 'Folio del ticket levantado'},
				{key: 'reason', label: 'Motivo'},
				{key: 'details', label: 'Detalles'},
				{key: 'total', label: 'Total'},
			]}
			data={penalties}
			totalCount={33}
		></Datatable>
	</AdminLayout>;
}

export async function getStaticProps() {
	let penalties, error;

	await bookService.getAll()
		.then(function (response) {
			if (response.status == 200) {
				penalties = response.data?.books;
			}
		})
		.catch(async (errors) => {
			error = errors.response?.data
		});
	return {
		props: {
			penalties,
			error
		},
	}
}

export default Penalties
