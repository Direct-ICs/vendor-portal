import React, { useEffect, useState } from 'react';
import PasswordInput from './PasswordInput';
import Auth from '../../utils/auth';
import HorizontalLoad from '../HorizontalLoad';
import { toast } from 'react-toastify';

function ChangePassword({ token, oldPassword, modalOpen, setModalOpen }) {
	const [formState, setFormState] = useState({
		current: '',
		new: '',
		confirm: '',
	});
	const [passwordCheck, setPasswordCheck] = useState({
		length: false,
		unique: false,
		upper: false,
		lower: false,
		special: false,
		number: false,
	});
    const [error, setError] = useState([]);
	const [inProgress, setInProgress] = useState(false);

    useEffect(() => {
        document.title = 'DCI Vendor Portal | Change Password';
    }, []);

	token = token || Auth.getProfile();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value.trim(),
		});
	};

	function handleModalClose (e) {
		if (e.target.className === 'modal-background' || e.target.className === "modal-btn close") {
			setModalOpen('false')
		}
	}

	useEffect(() => {
		checkPasswordComplexity();
	}, [formState.new]);

	function checkPasswordComplexity() {
		const pass = formState.new;
		const length = pass.length > 7 && pass.length < 61;
		const unique = pass !== token.email;
		const upper = /[A-Z]/.test(pass);
		const lower = /[a-z]/.test(pass);
		const number = /[0-9]/.test(pass);
		const special = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pass);
		setPasswordCheck({ length, unique, upper, lower, number, special });
	}

	async function handleFormSubmit(e) {
		e.preventDefault();
		
        setError([]);
		let errors = [];
		setInProgress(true);
        // check current password vs password in DB
		const response = await fetch('/auth/password', {
			method: 'post',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: Auth.getProfile().email,
				password: formState.current
			})
		});
		const matches = await response.json();
        matches || errors.push('Old password is not correct');

		formState.current === formState.new && errors.push('New password must be different than current password');

        // check new is the same as confirm password
        formState.new === formState.confirm || errors.push('New and confirm passwords do not match')
        // check password complexity
        const falseValues = Object.values(passwordCheck).filter(val => {
            return val === false
        });
        falseValues.length > 0 && errors.push('New password is not unique enough');

		if (matches) {
        	if (errors.length === 0) {
				// no errors
				fetch('/auth/changepass', {
					method: 'post',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: Auth.getProfile().email,
						password: formState.new,
						id: Auth.getProfile().zoho_id
					})
				})
				.then(response => {
					response.json();
				})
				.then(data => {
					if (response.ok) {
						setFormState({
							current: '',
							new: '',
							confirm: '',
						});
						setModalOpen('false');
						errors = []
						toast.success('Password successfully changed!');
					} else {
						toast.error('Error while trying to submit password. Try again later!');
					}
				})
			}
		}
		setError(errors);
		setInProgress(false);
    }

	return (
		<>
		{modalOpen === 'true' && (
		<div className="modal-background" onClick={handleModalClose}>
			<div
				className="modal-container"
				style={{
					width: '50%',
					overflow: 'auto',
					maxWidth: '400px',
					height: 'fit-content',
				}}
			>
				<div className="modal-head">Change Password</div>
				<div className="modal-body">
					<div style={{ marginLeft: '15px' }}>
						{inProgress && <HorizontalLoad />}
					</div>
                    {error.length > 0 &&
                    <div className='error-display'>
                        {error.map(e => (
                            <li key={e}>{e}</li>
                        ))}
                    </div>
                    }
					<form className="modal-form" onSubmit={handleFormSubmit}>
						<label className="password-form-label">
							Old Password
						</label>
						<PasswordInput
							handleChange={handleChange}
							password={formState.current}
							name="current"
							disabled={inProgress}
						/>
						<label className="password-form-label">
							New Password
						</label>
						<PasswordInput
							handleChange={handleChange}
							password={formState.new}
							name="new"
							disabled={inProgress}
						/>
						<label className="password-form-label">
							Confirm Password
						</label>
						<PasswordInput
							handleChange={handleChange}
							password={formState.confirm}
							name="confirm"
							disabled={inProgress}
						/>
						{(formState.new !== '' || formState.confirm !== '') && (
							<div id="password-rules">
								<ul style={{ listStyle: 'none' }}>
									<li
										className={
											passwordCheck.length
												? 'valid'
												: 'not-valid'
										}
									>
										The password should contain 8-60
										characters
									</li>
									<li
										className={
											passwordCheck.unique
												? 'valid'
												: 'not-valid'
										}
									>
										The password should not same as the
										login name.
									</li>
									<li
										className={
											passwordCheck.upper &&
											passwordCheck.lower &&
											passwordCheck.number &&
											passwordCheck.special
												? 'valid'
												: 'not-valid'
										}
									>
										The password should contain:
										<ul style={{ listStyle: 'square' }}>
											<li
												className={
													passwordCheck.upper
														? 'valid'
														: 'not-valid'
												}
											>
												Upper case letter
											</li>
											<li
												className={
													passwordCheck.lower
														? 'valid'
														: 'not-valid'
												}
											>
												Lower case letter
											</li>
											<li
												className={
													passwordCheck.number
														? 'valid'
														: 'not-valid'
												}
											>
												Number
											</li>
											<li
												className={
													passwordCheck.special
														? 'valid'
														: 'not-valid'
												}
											>
												Special Character
											</li>
										</ul>
									</li>
								</ul>
							</div>
						)}
						<div className="modal-footer">
							<button className="modal-btn submit" type='submit'>Submit</button>
							<button className="modal-btn close" onClick={handleModalClose}>Close</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)}
	</>);
}

export default ChangePassword;
