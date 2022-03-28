import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";
import { bookService } from "../../services";

function Loans({ loans }) {
	return <AdminLayout>
		<Datatable
			header={'Prestamos'}
			header_rows={[
				{ key: 'username', label: 'Usuario' },
				{ key: 'details', label: 'Detalles' },
				{ key: 'type', label: 'Objeto prestado' },
			]}
			data={loans}
			totalCount={33}
		></Datatable>
	</AdminLayout>;
}

export async function getStaticProps() {
	let loans, error;

	await bookService.getAll()
		.then(function (response) {
			if (response.status == 200) {
				loans = response.data?.books;
			}
		})
		.catch(async (errors) => {
			error = errors.response?.data
		});
	return {
		props: {
			loans,
			error
		},
	}
}

export default Loans
