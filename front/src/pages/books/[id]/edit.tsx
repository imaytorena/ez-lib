import React from 'react'
import AdminLayout from '../../../components/AdminLayout';

import { bookService } from '../../../services';

function Edit({ element }) {
    return (
        <AdminLayout>

        </AdminLayout>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query;

	let element = null, error = null;

	await bookService.getById(id)
		.then(function (response) {
			if (response.status == 200) {
				element = response.data?.book;
			}
		})
		.catch(async (errors) => {
			error = errors.response?.data?.message;
		});
    return { props: { element } };
}

export default Edit