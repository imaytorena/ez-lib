import React from 'react'
import AdminLayout from '../../../components/AdminLayout'
import UserForm from '../../../components/Pages/User/Form'
import { userService } from '../../../services';

function Edit({ element }) {
    return (
        <AdminLayout>
            <UserForm element={element} />
        </AdminLayout>
    )
}
export async function getServerSideProps(context) {
    const { id } = context.query;

	let element = null, error = null;

	await userService.getById(id)
		.then(function (response) {
			if (response.status == 200) {
				element = response.data?.user;
			}
		})
		.catch(async (errors) => {
			error = errors.response?.data?.message;
		});
    return { props: { element } };
}
export default Edit