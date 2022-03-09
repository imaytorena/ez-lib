import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";

function Penalties({ penalties }) {
	return <AdminLayout>
		<Datatable
			header={'Penalizaciones'}
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
			data={penalties}
			totalCount={33}
		></Datatable>
	</AdminLayout>;
}

// This function gets called at build time
export async function getStaticProps() {
	// Call an external API endpoint to get posts
	const res = await fetch('http://localhost:8000/api/penalties');
	let { penalties } = await res.json()
	// console.log(penalties);

	// By returning { props: { penalties } }, the Penalties component
	// will receive `penalties` as a prop at build time
	return {
		props: {
			penalties,
		},
	}
}

export default Penalties
