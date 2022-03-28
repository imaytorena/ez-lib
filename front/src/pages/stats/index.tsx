import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";
import { bookService } from "../../services";

function Stats({ stats }) {
	return <AdminLayout>
		<Datatable
			header={'Estadísticas'}
			header_rows={[
				{key: 'title', label: 'Titulo'},
				{key: 'description', label: 'Descripción'},
				{key: 'autor', label: 'Autor'},
				{key: 'publisher', label: 'Editorial'},
				{key: 'isbn', label: 'ISBN'},
				{key: 'year', label: 'Año'},
				{key: 'genre', label: 'Género'},
				{key: 'available', label: 'Disponibilidad'},
				{key: 'stock', label: 'stock'},
			]}
			data={stats}
			totalCount={33}
		></Datatable>
	</AdminLayout>;
}

export async function getStaticProps() {
	let stats, error;

	await bookService.getAll()
		.then(function (response) {
			if (response.status == 200) {
				stats = response.data?.books;
			}
		})
		.catch(async (errors) => {
			error = errors.response?.data
		});
	return {
		props: {
			stats,
			error
		},
	}
}

export default Stats
