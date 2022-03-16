
import AdminLayout from '../../../components/AdminLayout';
import { bookService } from '../../../services';

const Book = ({ book }) => {
	return (
		<AdminLayout>

		</AdminLayout>
	);
}

export async function getServerSideProps(context) {
	const { id } = context.query;

	let book = null, error = null;

	await bookService.getById(id)
		.then(function (response) {
			if (response.status == 200) {
				book = response.data?.book;
			}
		})
		.catch(async (errors) => {
			error = errors.response?.data?.message;
		});
	return { props: { book } };
}

export default Book;