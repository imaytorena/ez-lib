import { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../styles/theme";

import { makeServer } from '../services/mirage';

import { routes, RoutesContext } from "../context/Routes";


makeServer();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<RoutesContext.Provider value={routes}>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</RoutesContext.Provider>
	)
}

export default MyApp
