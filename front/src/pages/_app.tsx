import axios from "axios";
import { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "../context/UsersContext";

import { theme } from "../styles/theme";

axios.defaults.baseURL = process.env.REACT_APP_API_URL ?? `http://easylibrary.test/api`;

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
