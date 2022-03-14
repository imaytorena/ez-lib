import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";

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

	await fetch('http://localhost:8000/api/fees')
		.then(async response => {
			if (!response.ok) {
				const data = await response.text();
				error = JSON.parse(data);
				reports = [];
			} else {
				const data = await response.json();
				reports = data.fees;
				error = null;
			}
		}).catch(e => { console.error(e) });

	return {
		props: {
			reports,
			error
		},
	}
}

export default Reports
