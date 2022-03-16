
import AdminLayout from '../../../components/AdminLayout';
import { materialService } from '../../../services';

const Book = ({ material }) => {
	return (
		<AdminLayout>

		</AdminLayout>
	);
}

export async function getServerSideProps(context) {
	const { id } = context.query;

	let material = null, error = null;

	await materialService.getById(id)
		.then(function (response) {
			if (response.status == 200) {
				material = response.data?.material;
			}
		})
		.catch(async (errors) => {
			error = errors.response?.data?.message;
		});
	return { props: { material } };
}

export default Book;