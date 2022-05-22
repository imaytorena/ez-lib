
import AdminLayout from '../../../components/AdminLayout';
import BookCard from '../../../components/Pages/Book/BookCard';
import { bookService } from '../../../services';

const Book = ({ book }) => {
	return (
		<AdminLayout>
			<BookCard {...book} />
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
			console.log(response.data?.book)
		})
		.catch(async (errors) => {
			error = errors.response?.data?.message;
		});
	return { props: { book } };
}

export default Book;