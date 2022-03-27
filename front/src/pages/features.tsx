import { ReactNode } from 'react';
import {
    Stack,
    Container,
    Box,
    Flex,
    Text,
    Heading,
    SimpleGrid,
    Button,
    HStack,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function Features() {
    return (<>
        <Box bg={'gray.800'} position={'relative'}>
            <Flex
                flex={1}
                zIndex={0}
                display={{ base: 'none', lg: 'flex' }}
                backgroundImage="url('https://www.udg.mx/sites/default/files/img_noticias/150720_biblioteca_publica_juan_jose_arreola_cumple_154_anos_gaceta_udeg_1.jpg')"
                backgroundSize={'cover'}
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                opacity={.4}
                // background={}={"10%"}
                position={'absolute'}
                width={'50%'}
                insetY={0}
                right={0}>
                <Flex
                    bgGradient={'linear(to-r, gray.800 10%, transparent)'}
                    w={'full'}
                    h={'full'}
                />
            </Flex>
            <Container maxW={'7xl'} zIndex={10} position={'relative'}>
                <Stack direction={{ base: 'column', lg: 'row' }}>
                    <Stack
                        flex={1}
                        color={'gray.400'}
                        justify={{ lg: 'center' }}
                        height="100vh">
                        <Box mb={{ base: 8, md: 20 }}>
                            <Text
                                fontFamily={'heading'}
                                fontWeight={700}
                                textTransform={'uppercase'}
                                mb={3}
                                fontSize={'xl'}
                                color={'gray.500'}>
                                REGISTRO ABIERTO
                            </Text>
                            <Heading
                                color={'white'}
                                mb={5}
                                fontSize={{ base: '3xl', md: '5xl' }}>
                                Estudiantes, Docentes y Púbico en general
                            </Heading>
                            <Text fontSize={'xl'} color={'gray.400'}>
                                Como usuario puedes realizar consultas de los datos almacenados en
                                la biblioteca, realizar valoraciones, reviews y/o renta de los
                                libros y materiales que la biblioteca te proporciona.
                            </Text>
                        </Box>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                            {stats.map((stat) => (
                                <Box key={stat.title}>
                                    <Text
                                        fontFamily={'heading'}
                                        fontSize={'3xl'}
                                        color={'white'}
                                        mb={3}>
                                        {stat.title}
                                    </Text>
                                    <Text fontSize={'xl'} color={'gray.400'}>
                                        {stat.content}
                                    </Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Stack>
                    <Flex flex={1} />
                </Stack>
            </Container>
        </Box>
        <HStack
            spacing={5}
            position={"fixed"}
            zIndex={12}
            bottom={20}
            right={40}
        >
            <Link href={"/auth/signup"} passHref>
                <Button
                    bg={"blue.500"}
                    borderColor={"white"}
                    _hover={{ bg: "blue.600" }}
                    _active={{ bg: "blue.500" }}

                >
                    Nuevo registro
                </Button>
            </Link>
            <Link href={"/auth/login"} passHref>
                <Button
                    bg={"gray.500"}
                    borderColor={"white"}
                    _hover={{ bg: "gray.600" }}
                    _active={{ bg: "gray.500" }}

                >
                    Ingresar con cuenta
                </Button>
            </Link>
        </HStack>
    </>
    );
}

const StatsText = ({ children }: { children: ReactNode }) => (
    <Text as={'span'} fontWeight={700} color={'white'}>
        {children}
    </Text>
);

const stats = [
    {
        title: '+50 ✨',
        content: (
            <>
                <StatsText>Best sellers</StatsText> se encuentran disponibles para
                renta de cualquier usuario registrado.
            </>
        ),
    },
    {
        title: '10+ 🆕',
        content: (
            <>
                <StatsText>Ejemplares nuevos</StatsText> cada semana.
            </>
        ),
    },
    {
        title: '80% ✔',
        content: (
            <>
                De los <StatsText>usuarios activos</StatsText> pertenecen a la comunidad estudiantil de
                la <StatsText>Universidad de Guadalajara</StatsText>.
            </>
        ),
    },
    {
        title: '3 de cada 5 💻',
        content: (
            <>
                <StatsText>Materiales</StatsText> fue entregado en el trimestre pasado
                como parte de la renovación de la biblioteca universitaria.
            </>
        ),
    },
];
