import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";

function Penalties({ penalties }) {
	return <AdminLayout>
		<Datatable
			header={'Penalizaciones'}
			header_rows={[
				{key: 'ticket_folio', label: 'Folio del ticket levantado'},
				{key: 'reason', label: 'Motivo'},
				{key: 'details', label: 'Detalles'},
				{key: 'total', label: 'Total'},
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
	let penalties;
	try {
		let data = await res.json();
		penalties = data.penalties;
	} catch (error) {
		penalties = [];
	}
	console.log(penalties);

	// By returning { props: { penalties } }, the Penalties component
	// will receive `penalties` as a prop at build time
	return {
		props: {
			penalties,
		},
	}
}

export default Penalties
