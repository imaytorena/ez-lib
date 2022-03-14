import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";

function Fees({ fees, error }) {
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


export async function getStaticProps() {
	let fees, error;

	await fetch('http://localhost:8000/api/fees')
		.then(async response => {
			if (!response.ok) {
				const data = await response.text();
				error = JSON.parse(data);
				fees = [];
			} else {
				const data = await response.json();
				fees = data.fees;
				error = null;
			}
		}).catch(e => { console.error(e) });

	return {
		props: {
			fees,
			error
		},
	}
}

export default Fees;