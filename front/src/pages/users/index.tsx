import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";

function Users({ users }) {
	return <AdminLayout>
		<Datatable
			header={'Penalizaciones'}
			header_rows={[
				{key: 'username', label: 'Usuario'},
				{key: 'code', label: 'Código'},
				{key: 'email', label: 'Correo electrónico'},
				{key: 'name', label: 'Nombre'},
				{key: 'last_name', label: 'Apellido'},
				{key: 'genre', label: 'Género'},
			]}
			data={users}
			totalCount={33}
		></Datatable>
	</AdminLayout>;
}

// This function gets called at build time
export async function getStaticProps() {
	// Call an external API endpoint to get posts
	const res = await fetch('http://localhost:8000/api/users');
	let users;
	try {
		let data = await res.json();
		users = data.users;
	} catch (error) {
		users = []
	}
	// console.log(users);

	// By returning { props: { users } }, the Users component
	// will receive `users` as a prop at build time
	return {
		props: {
			users,
		},
	}
}

export default Users
