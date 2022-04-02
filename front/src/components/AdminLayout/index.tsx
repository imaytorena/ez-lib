import React, { ReactNode, useEffect } from 'react'
import { BoxProps, Flex, useToast } from '@chakra-ui/react';
import SidebarWithHeader from '../Sidebar';
import { useRouter } from 'next/router';

interface AdminLayout extends BoxProps {
    onClose: () => void;
}
const AdminLayout = ({ error, children }: { error?: { status?: number; message: string; }, children: ReactNode; }) => {
    const router = useRouter();
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
    }, [error, router, toast]);

    if (error?.status == 403) {
        router.push("/auth/login")
        return <></>
    }


    return (
        <SidebarWithHeader>
            <Flex
                w="100%"
                maxWidth={1220}
                mx="auto"
                px="6"
                my="6"
                direction="column"
            >
                {children}
            </Flex>
        </SidebarWithHeader>
    )
}

export default AdminLayout;