import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";
import { bookService } from "../../services";
import {useState} from "react";

function Loans({ loans }) {
	const [booksData, setBooksData] = useState(loans);

	const onPageChange = async (page) => {
		await bookService.getAll({ page: page })
			.then(function (response) {
				if (response.status == 200) {
					setBooksData(response.data?.books)
				}
			})
			.catch(async (errors) => {
				console.error(errors.response?.data);
			});
	}

	return <AdminLayout>
		<Datatable
			header={'Prestamos'}
			header_rows={[
				{ key: 'username', label: 'Usuario' },
				{ key: 'details', label: 'Detalles' },
				{ key: 'type', label: 'Objeto prestado' },
			]}
			onPageChange={onPageChange}
			{...booksData}
		/>
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
