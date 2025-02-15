import "./Auth.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { createUser } from "../../Services/users.services";

export default function SignUp() {
	const navigate = useNavigate();
	const { signUp } = useAuth();
	const [signUpForm, setSignUpForm] = useState({
		email: "",
		password: "",
		confirm_password: "",
	});

	function handleChange(e) {
		const value = e.target.value;
		setSignUpForm({ ...signUpForm, [e.target.id]: e.target.value });
	}

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const response = await signUp(signUpForm.email, signUpForm.password);
			const newUser = await createUser({
				email: signUpForm.email,
				uid: response.user.uid,
			});

			setSignUpForm({});
			navigate("/account");
		} catch (error) {
			console.log(error);
		} finally {
			// setIsLoading(false);
		}
	}
	return (
		<section className="auth global_card">
			<h3 className="poppins-semibold">Create an account!</h3>

			<form className="auth_form" onSubmit={handleSubmit}>
				<label></label>
				<input
					className="global_input_field"
					type="text"
					placeholder="Email*"
					value={signUpForm.email}
					onChange={handleChange}
					id="email"
					required
				/>

				<label></label>
				<input
					type="password"
					placeholder="Password*"
					value={signUpForm.password}
					onChange={handleChange}
					id="password"
					required
					className="global_input_field"
				/>

				<label></label>
				<input
					type="password"
					placeholder="Confirm Password*"
					value={signUpForm.confirm_password}
					onChange={handleChange}
					id="confirm_password"
					required
					className="global_input_field"
				/>

				<Link to="/auth/forgot" className="forgot_password">
					Forgot Password?
				</Link>

				<button className="btn btn_bg_dark " type="submit">
					Sign up
				</button>
				<Link to="/auth" className="text-orange-500 underline">
					Login instead
				</Link>
			</form>
		</section>
	);
}
