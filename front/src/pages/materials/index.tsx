import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import Datatable from "../../components/Datatable";
import { materialService } from "../../services";

function Materials({ materials, error }) {
	const [materialsData, setMaterialsData] = useState(materials);
	const toast = useToast();

	useEffect(() => {
		if (error) {
			toast({
				description: error?.message,
				status: "error",
				position: "bottom",
				duration: 4000,
				isClosable: true,
			});
		}
	}, [error, toast]);

    const onPageChange = async (page) => {
        await materialService.getList({page: page})
			.then(function (response) {
				if (response.status == 200) {
					setMaterialsData(response.data?.materials)
				}
			})
    }

	return <AdminLayout>
		<Datatable
			header={'Materiales'}
			header_rows={[
				{key: 'serial_number', label: 'Númmero de serie'},
				{key: 'option', label: 'Material'},
				{key: 'details', label: 'Detalles'},
				{key: 'brand', label: 'Marca'},
				{key: 'model', label: 'Modelo'},
				{key: 'status', label: 'Estado'},
			]}
			onPageChange={onPageChange}
			{...materialsData}
		/>
	</AdminLayout>;
}

export async function getServerSideProps() {
	let materials = null, error = null;

	await materialService.getList()
		.then(function (response) {
			if (response.status == 200) {
				materials = response.data;
			}
		})
		.catch(async (errors) => {
			error = errors.response?.data
		});

	return {
		props: {
			materials,
			error
		},
	}
}

export default Materials
