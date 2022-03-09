import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";

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

// This function gets called at build time
export async function getStaticProps() {
	// Call an external API endpoint to get posts
	const res = await fetch('http://localhost:8000/api/stats');
	let stats;
	try {
		let data = await res.json();
		stats = data.stats;
	} catch (error) {
		stats = []
	}
	// console.log(stats);

	// By returning { props: { stats } }, the Stats component
	// will receive `stats` as a prop at build time
	return {
		props: {
			stats,
		},
	}
}

export default Stats
