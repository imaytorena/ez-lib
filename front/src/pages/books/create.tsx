import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { SelectAutocomplete } from '../../components/FormElements';
import BookForm from '../../components/Pages/Book/BookForm';
import CopyForm from '../../components/Pages/Book/CopyForm';
import { bookService } from '../../services';

function Create({ book, error }) {
    const [copiesState, setCopiesState] = useState([])
    return (
        <AdminLayout>
            <Tabs defaultIndex={!!book ? 1 : 0} isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab>{"CREAR UN NUEVO LIBRO"}</Tab>
                    <Tab>{"AGREGAR EJEMPLAR A UN LIBRO"}</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <BookForm />
                    </TabPanel>
                    <TabPanel>
                        <CopyForm book={book} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </AdminLayout>
    )
}

export async function getServerSideProps(context) {
    let book = null, error = null;
    const { copy } = context.query;
    if (copy) {
        await bookService.getById(copy)
            .then(function (response) {
                if (response.status == 200) {
                    console.log(response.data)
                    book = response.data?.book;
                }
            })
            .catch(async (errors) => {
                error = errors.response?.data
            });
    }

    return {
        props: {
            book,
            error
        }
    }
}

export default Create