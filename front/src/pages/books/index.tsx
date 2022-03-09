import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";

function Books({ posts }) {
	return <AdminLayout>
		<Datatable
			label={'Hola'}
		></Datatable>
	</AdminLayout>;
}

// This function gets called at build time
export async function getStaticProps() {
	// Call an external API endpoint to get posts
	// const res = await fetch('https://.../posts')
	const posts = {}

	// By returning { props: { posts } }, the Books component
	// will receive `posts` as a prop at build time
	return {
		props: {
			posts,
		},
	}
}

export default Books
