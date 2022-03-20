import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import AdminLayout from '../../components/AdminLayout'
import BookForm from '../../components/Pages/Book/BookForm';

function Create({ copy }) {
    return (
        <AdminLayout>
            <Tabs defaultIndex={copy && 1} isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab>{"CREAR UN NUEVO LIBRO"}</Tab>
                    <Tab>{"AGREGAR EJEMPLAR A UN LIBRO"}</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <BookForm />
                        {/* <p>Formulario crear libro</p>
                        <hr />
                        <p>apartado para agregar ejemplares</p> */}
                    </TabPanel>
                    <TabPanel>
                        {/* <p>{`${copy ? copy : "select libro"}`}</p>
                        <hr />
                        <p>formulario crear ejemplar</p> */}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </AdminLayout>
    )
}

export async function getServerSideProps(context) {
    const { copy } = context.query;

    return {
        props: {
            copy: copy || null
        }
    }
}

export default Create