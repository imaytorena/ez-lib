import React from 'react'
import AdminLayout from '../../components/AdminLayout'
import UserForm from '../../components/Pages/User/Form'
import { User as UserType } from '../../constants';

interface UserFormProps {
    element?: UserType;
}
function Create({ element }) {
    return (
        <AdminLayout>
            <UserForm element={element}/>
        </AdminLayout>
    )
}

export default Create