import axios from "axios";
import { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "../context/UsersContext";

import { theme } from "../styles/theme"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API ?? `http://localhost:80/api`;

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</UserProvider>
	)
}

export default MyApp
