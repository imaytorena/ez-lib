import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";
import { bookService } from "../../services";

function Reports({ reports }) {
	return <AdminLayout>
		<Datatable
			header={'Reportes'}
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
			data={reports}
			totalCount={33}
		></Datatable>
	</AdminLayout>;
}


export async function getStaticProps() {
	let reports, error;

	await bookService.getAll()
		.then(function (response) {
			if (response.status == 200) {
				reports = response.data?.books;
			}
		})
		.catch(async (errors) => {
			error = errors.response?.data
		});
	return {
		props: {
			reports,
			error
		},
	}
}

export default Reports
