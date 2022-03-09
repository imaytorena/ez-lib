import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";

function Loans({ posts }) {
	return <AdminLayout>
		<Datatable
			header={'Prestamos'}
			header_rows={[
				{ key: 'name', label: 'Nombre' },
				{ key: 'author', label: 'Autor' },
			]}
			data={[
				{ id: 1, name: 'nombre', author: 'assdads' },
				{ id: 2, name: 'nombre', author: 'assdads' },
				{ id: 3, name: 'nombre', author: 'assdads' },
				{ id: 4, name: 'nombre', author: 'assdads' },
				{ id: 5, name: 'nombre', author: 'assdads' },
			]}
			totalCount={33}
		></Datatable>
	</AdminLayout>;
}

// This function gets called at build time
export async function getStaticProps() {

	// Call an external API endpoint to get posts
	const res = await fetch('http://localhost:8000/api/books')
	const posts = {}

	// By returning { props: { posts } }, the Loans component
	// will receive `posts` as a prop at build time
	return {
		props: {
			posts,
		},
	}
}

export default Loans
