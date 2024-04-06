import { Link, useNavigate } from "react-router-dom";
import LabelledInput from "./LabelledInput";
import { useState } from "react";
import { UserSigninType, UserSignupType } from "@maharshiv16/medium-clone-maharshi";
import SignButton from "./SignButton";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
	const navigate = useNavigate();
	const [signupInputs, setSignupInputs] = useState<UserSignupType>({
		name: "",
		email: "",
		password: "",
	});
	const [signinInputs, setSigninInputs] = useState<UserSigninType>({
		email: "",
		password: "",
	});
	const sendSignupReq = async () => {
		try {
			const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signupInputs);
			const jwt = res.data.jwt;
			localStorage.setItem("authorization", jwt);
			navigate("/api/v1/blog/bulk");
		} catch (error) {
			alert();
		}
	};

	const sendSigninReq = async () => {
		try {
			const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, signinInputs);
			const jwt = res.data.jwt;
			localStorage.setItem("authorization", jwt);
			navigate("/blogs");
		} catch (error) {
			alert();
		}
	};

	return (
		<div className='items-center h-screen flex justify-center flex-col'>
			<div className='text-4xl font-extrabold mb-4'>{type === "signup" ? "Create an account" : "Login to your account"}</div>
			<div className='text-slate-400 text-xl font-light mb-8'>
				{type === "signup" ? "Already have an account ?" : "Don't have an account ?"}
				<Link className='underline pl-2' to={type === "signup" ? "/signin" : "/signup"}>
					{type === "signup" ? "Signin" : "Signup"}
				</Link>
			</div>
			{type === "signup" && (
				<LabelledInput
					label='Username'
					placeholder='Enter your username'
					onChange={(e) => {
						setSignupInputs((c) => ({
							...c,
							name: e.target.value,
						}));
					}}
				/>
			)}
			<LabelledInput
				label='Email'
				placeholder='Enter your email'
				onChange={(e) => {
					setSignupInputs((c) => ({
						...c,
						email: e.target.value,
					}));
					setSigninInputs((c) => ({
						...c,
						email: e.target.value,
					}));
				}}
			/>
			<LabelledInput
				label='Password'
				type='password'
				placeholder='********'
				onChange={(e) => {
					setSignupInputs((c) => ({
						...c,
						password: e.target.value,
					}));
					setSigninInputs((c) => ({
						...c,
						password: e.target.value,
					}));
				}}
			/>
			<SignButton label={type} onClick={type === "signup" ? sendSignupReq : sendSigninReq} />
		</div>
	);
};

export default Auth;
