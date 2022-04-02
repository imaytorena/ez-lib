import { AuthContainer, HeaderText, FormContainer, SwitchRoute } from '../../components/Pages/Auth';
import LoginForm from '../../components/Pages/Auth/LoginForm';
import SwitchTheme from '../../components/Misc/SwitchTheme';

const Login = () => {
	return (<>
		<AuthContainer>
			<HeaderText title={"Iniciar sesión con una cuenta"} />
			<FormContainer>
				<LoginForm />
				<SwitchRoute
					text={"No cuento con un usuario"}
					pathTo={"/auth/signup"}
				/>
			</FormContainer>
		</AuthContainer>
		<SwitchTheme fixed />
	</>);
}

export default Login
