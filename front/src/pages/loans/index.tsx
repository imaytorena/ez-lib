import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";

function Loans({ loans }) {
	return <AdminLayout>
		<Datatable
			header={'Prestamos'}
			header_rows={[
				{ key: 'username', label: 'Usuario' },
				{ key: 'details', label: 'Detalles' },
			]}
			data={loans}
			totalCount={33}
		></Datatable>
	</AdminLayout>;
}

// This function gets called at build time
export async function getStaticProps() {

	// Call an external API endpoint to get loans
	const res = await fetch('http://localhost:8000/api/loans')
	let loans;
	try {
		let data = await res.json();
		loans = data.loans;
	} catch (error) {
		loans = [];
	}

	// By returning { props: { loans } }, the Loans component
	// will receive `loans` as a prop at build time
	return {
		props: {
			loans,
		},
	}
}

export default Loans
