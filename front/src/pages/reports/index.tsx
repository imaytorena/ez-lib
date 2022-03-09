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

// This function gets called at build time
export async function getStaticProps() {
	// Call an external API endpoint to get posts
	const res = await fetch('http://localhost:8000/api/reports');
	let { reports } = await res.json()
	// console.log(reports);

	// By returning { props: { reports } }, the Reports component
	// will receive `reports` as a prop at build time
	return {
		props: {
			reports,
		},
	}
}

export default Reports
