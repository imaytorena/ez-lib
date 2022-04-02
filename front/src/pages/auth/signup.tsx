import { useState } from 'react';
import SwitchTheme from '../../components/Misc/SwitchTheme';
import { AuthContainer, FormContainer, HeaderText, SwitchRoute } from '../../components/Pages/Auth';
import SignupForm from '../../components/Pages/Auth/SignupForm';

export default function SignupCard() {
	const [showPassword, setShowPassword] = useState(false);

	return (<>
		<SwitchTheme fixed />
		<AuthContainer>
			<HeaderText title={"Registrar un nuevo usuario"} />
			<FormContainer>
				<SignupForm />
				<SwitchRoute
					text={"Ya tengo un usuario"}
					pathTo={"/auth/login"}
				/>
			</FormContainer>
		</AuthContainer>
	</>

	);
}