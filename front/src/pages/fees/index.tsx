import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";

function Fees({ fees }) {
	return <AdminLayout>
		<Datatable
			header={'Cobros o cargos'}
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
			data={fees}
			totalCount={33}
		></Datatable>
	</AdminLayout>;
}

// This function gets called at build time
export async function getStaticProps() {
	// Call an external API endpoint to get posts
	const res = await fetch('http://localhost:8000/api/fees');
	let { fees } = await res.json()
	// console.log(fees);

	// By returning { props: { fees } }, the Fees component
	// will receive `fees` as a prop at build time
	return {
		props: {
			fees,
		},
	}
}

export default Fees
