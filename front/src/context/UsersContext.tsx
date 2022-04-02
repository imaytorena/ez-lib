import {createContext, ReactNode, useContext, useState} from "react";
import {User} from "../constants";
import {userService} from "../services";

interface UserResponse {
	user: User;
	token: {
		token_type: string;
		expires_in: number;
		access_token: string;
		refresh_token: string;
	}
}
interface UserContextProps {
	user: User;
	getUser: (updated?: boolean) => Promise<User>,
	saveUser: (user?: UserResponse) => Promise<boolean>
}
interface UserProviderProps {
	children: ReactNode;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export function UserProvider({ children }: UserProviderProps) {
	const [user, setUser] = useState<User | null>(null);

	async function getUser(): Promise<User> {
		return user;
		// if (!updated) {
		// 	return user;
		// }
		// const { data, headers } = await userService.getById(user?.id);
		//
		// const user =
		//
		// setUser(user)
	}

	async function saveUser(data?: UserResponse): Promise<boolean> {
		let success = false;
		await userService.getProfile()
			.then(function (response) {
				if (response.status == 201) {
					setUser(response.data?.user);
					success = true;
				}
			})
			.catch(async (errors) => {
				console.error(errors.response?.data)
			});
		console.log(data);
		return success;
	}

	return (
		<UserContext.Provider
			value={{
				user,
				saveUser,
				getUser,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export function useUser() {
	return useContext(UserContext);
}