import React, { useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import SignOnHeader from './SignOnHeader';
import { Link } from 'react-router-dom';
import FirstLogin from '../FirstLogin';

function SignOn() {
	const [formState, setFormState] = useState({ email: '', password: '' });
	const [error, setError] = useState('');
	const [peekPassword, setPeekPassword] = useState(false);
	const [changePassword, setPageStatus] = useState({
		state: false,
		token: null
	});

	if (Auth.loggedIn()) {
		// window.location.assign('/auth/redirect');
	}

	useEffect(() => {
        document.title = 'DCI Vendor Portal | Login';
    }, []);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value.trim(),
		});
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		setError('');
		try {
			const response = await fetch(`/auth/login`, { 
				method: 'post',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formState)
			})
			const data = await response.json();

			// Information came back as correct
			if (response.status === 200) {
				if (data.passwordChange === 'true') {
					// change password 
					setPageStatus({ state: true, token: data.resp.token })
				} else {
					Auth.login(data.resp.token);
					window.location.replace('/auth/redirect');
					// window.location.replace('/auth/redirect');
				}
			// Information is incorrect
			} else if (data.message.code === 3100) {
				setError("No account exists with this email");
			} else {
				setError("Information is incorrect");
			}
			if (response.statusText === 'Unauthorized') {
				// await Auth.reAuth().then(() => this.handleFormSubmit());
			}
		} catch (e) {
		  console.error(e);
		}
	};

	return (<>
		<SignOnHeader />
			<div className="sign-on-wrapper">

				{changePassword.state 
				? <FirstLogin token={changePassword.token} oldPassword={formState.password} />
				: (<>
				<div className="title">
					<h2 style={{ fontWeight: '400' }}>Sign in</h2>
				</div>
				<div className="sign-on-container">
					{error && (
					<div id="login-error"
						className='error-display'>
						{error}
					</div>
					)}
					<form onSubmit={handleFormSubmit}>
						<div className='flex login-form-input'>
						<input
							type="email"
							name="email"
							value={formState.email}
							onChange={handleChange}
							placeholder="Email"
							required
						/>
						</div>
						<div className='flex login-form-input'>
							<input
								type={`${peekPassword ? 'text' : 'password'}`}
								name="password"
								value={formState.password}
								onChange={handleChange}
								placeholder="Password"
								required
							/>
							<div 
								onClick={(e) => setPeekPassword(!peekPassword)}
								style={{ 
									cursor: 'pointer'
								}}>
								{peekPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye /> }
							</div>
						</div>
						<button type='submit' className="login-btn">Log in</button>
					</form>

					<div className='flex' style={{ flexDirection: 'column'}}>
						<Link className='forgot-info' to='/login/forgot'>
							Forgot your password?
						</Link>
						<Link className='forgot-info' to='/login/get-details'>
							Need login details?
						</Link>
					</div>
				</div>
			</>)}
			</div>
	</>);
}

export default SignOn;
