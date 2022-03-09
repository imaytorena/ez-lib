import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";

function Books({ books }) {
	return <AdminLayout>
		<Datatable
			header={'Libros'}
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
			data={books}
			totalCount={33}
		></Datatable>
	</AdminLayout>;
}

// This function gets called at build time
export async function getStaticProps() {
	// Call an external API endpoint to get posts
	const res = await fetch('http://localhost:8000/api/books');
	let books;
	try {
		let data = await res.json();
		books = data.books;
	} catch (error) {
		books = [];
	}
	// console.log(books);

	// By returning { props: { books } }, the Books component
	// will receive `books` as a prop at build time
	return {
		props: {
			books,
		},
	}
}

export default Books
