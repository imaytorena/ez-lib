import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";

function Materials({ materials }) {
	return <AdminLayout>
		<Datatable
			header={'Libros'}
			header_rows={[
				{key: 'serial_number', label: 'Númmero de serie'},
				{key: 'option', label: 'Material'},
				{key: 'details', label: 'Detalles'},
				{key: 'brand', label: 'Marca'},
				{key: 'model', label: 'Modelo'},
				{key: 'status', label: 'Estado'},
			]}
			data={materials}
			totalCount={33}
		></Datatable>
	</AdminLayout>;
}

// This function gets called at build time
export async function getStaticProps() {
	// Call an external API endpoint to get posts
	const res = await fetch('http://localhost:8000/api/materials');
	let { materials } = await res.json()
	// console.log(materials);

	// By returning { props: { materials } }, the Materials component
	// will receive `materials` as a prop at build time
	return {
		props: {
			materials,
		},
	}
}

export default Materials
