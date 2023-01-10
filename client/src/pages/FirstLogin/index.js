import React, { useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import HorizontalLoad from '../../components/HorizontalLoad';
import PasswordInput from '../../components/ChangePassword/PasswordInput';
import decode from 'jwt-decode';

function FirstLogin ({ token, oldPassword }) {
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

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value.trim(),
		});
	};

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

		const matches = formState.current === oldPassword;
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
						email: decode(token).email,
						password: formState.new,
						id: decode(token).zoho_id
					})
				})
				.then(response => {
					response.json();
                    if (response.ok) {
						setFormState({
							current: '',
							new: '',
							confirm: '',
						});
                        errors = []
                        Auth.login(token);
                        window.location.replace('/auth/redirect');
					}
				})
				.catch(err => {
                    return;
				})
			}
		}
		setError(errors);
		setInProgress(false);
    }

    return (
        <div
				className="modal-container"
				style={{
                    position: 'relative',
					overflow: 'auto',
					maxWidth: '400px',
					height: 'fit-content',
                    left: 'auto',
                    right: 'auto',
                    top: '18%',
                    border: 'none'
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
					<button className="modal-btn submit" onClick={handleFormSubmit}>Submit</button>
                    </div>
					</form>
				</div>
                </div>
    )
}

export default FirstLogin;