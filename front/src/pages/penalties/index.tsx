import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";
import { bookService } from "../../services";
import {useState} from "react";

function Penalties({ penalties }) {
	const [booksData, setBooksData] = useState(penalties);

	const onPageChange = async (page) => {
		await bookService.getAll({ page: page })
			.then(function (response) {
				if (response.status == 200) {
					setBooksData(response.data?.books)
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
			{...booksData}
		/>
	</AdminLayout>;
}


export async function getServerSideProps() {
	let penalties = null, error = null;

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
