import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";

function Books({ books, error }) {
	const toast = useToast();

	useEffect(() => {
		if (error) {
			toast({
				description: error?.message,
				status: "error",
				position: "bottom",
				duration: 4000,
				isClosable: true,
			});
		}
	}, [error]);

	return <AdminLayout>
		<Datatable
			header={'Libros'}
			header_rows={[
				{ key: 'title', label: 'Titulo' },
				{ key: 'description', label: 'Descripción' },
				{ key: 'autor', label: 'Autor' },
				{ key: 'publisher', label: 'Editorial' },
				{ key: 'isbn', label: 'ISBN' },
				{ key: 'year', label: 'Año' },
				{ key: 'genre', label: 'Género' },
				{ key: 'available', label: 'Disponibilidad' },
				{ key: 'stock', label: 'stock' },
			]}
			data={books}
			totalCount={33}
		></Datatable>
	</AdminLayout>;
}

export async function getStaticProps() {
	let books, error;

	await fetch('http://localhost:8000/api/books')
		.then(async response => {
			if (!response.ok) {
				const data = await response.text();
				error = JSON.parse(data);
				books = [];
			} else {
				const data = await response.json();
				books = data.books;
				error = null;
			}
		}).catch(e => { console.error(e) });

	return {
		props: {
			books,
			error
		},
	}
}

export default Books
