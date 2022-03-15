
import AdminLayout from '../../../components/AdminLayout';
import UserCard from '../../../components/Pages/User/UserCard';
import { userService } from '../../../services';

const User = ({user}) => {
    return (
        <AdminLayout>
            <UserCard {...user} />
        </AdminLayout>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.query;

	let user = null, error = null;

	await userService.getById(id)
		.then(function (response) {
			if (response.status == 200) {
				user = response.data?.user;
			}
		})
		.catch(async (errors) => {
			error = errors.response?.data?.message;
		});
    return { props: { user } };
}

export default User;