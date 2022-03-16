import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";
import { bookService } from "../../services";

function Books({ books, error }) {
	const [booksData, setBooksData] = useState(books);
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

    const onPageChange = async (page) => {
        await bookService.getAll({page: page})
			.then(function (response) {
				if (response.status == 200) {
					setBooksData(response.data?.books)
				}
			})
    }

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
			onPageChange={onPageChange}
			{...booksData}
		></Datatable>
	</AdminLayout>;
}

export async function getServerSideProps() {
	let books = null, error = null;

	await bookService.getAll()
		.then(function (response) {
			if (response.status == 200) {
				books = response.data?.books;
			}
		})
		.catch(async (errors) => {
			error = errors.response?.data
		});

	return {
		props: {
			books,
			error
		},
	}
}

export default Books
