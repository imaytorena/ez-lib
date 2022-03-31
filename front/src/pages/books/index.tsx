import { Td, Text, Tooltip, useToast } from "@chakra-ui/react";
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";
import { CustomRowProps } from "../../constants";
import { bookService } from "../../services";

const customRow = ({ header, data, index, ...rest }: CustomRowProps) => {
	let available = parseInt(data["available"]);
	return <Td
		key={`${header}-${index}`}
		{...rest}
	>
		<Tooltip label={!available && "No hay disponibilidad"} placement='bottom'>
			<Text noOfLines={1} color={(header.key == "stock" && !available) && "red.700"}>
				{data[header.key]}
			</Text>
		</Tooltip>
	</Td>
}

function Books({ books, error }) {
	const [booksData, setBooksData] = useState(books);

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

	return <AdminLayout error={error}>
		<Datatable
			header={'Libros'}
			header_rows={[
				{ key: 'title', label: 'Titulo' },
				// { key: 'description', label: 'Descripción' },
				{ key: 'autor', label: 'Autor' },
				{ key: 'publisher', label: 'Editorial' },
				// { key: 'isbn', label: 'ISBN' },
				// { key: 'year', label: 'Año' },
				{ key: 'genre', label: 'Género' },
				{ key: 'stock', label: 'Existencia', custom_row: customRow },
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
			// console.log(response)
			if (response.status == 200) {
				books = response.data?.books;
			}
		})
		.catch(async (errors) => {
			// console.error(errors.response?.data)
			error = errors.response?.data
			if (errors.response.status == 403) {
				error = { status: 403, message: 'Usuario no autenticado' }
			}
		});

	return {
		props: {
			books,
			error
		},
	}
}

export default Books
