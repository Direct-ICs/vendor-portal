import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignOnHeader from '../SignOn/SignOnHeader';
import Auth from '../../utils/auth';

function ForgotPassword () {
    const [error, setError] = useState({message: [], success: false});

    async function handleFormSubmit (e) {
        e.preventDefault();
        const email = e.target.email.value;
        // find user account by email
        try {
            const response = await fetch(`/api/users/dashboard/${email}`, { 
				method: 'get'
			})
			const data = await response.json();

			// Information came back as correct
			if (response.status === 200) {
                const changePasswordResponse = await fetch(`/auth/password/forgot/${data.data[0].ID}`, { 
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const changeData = await changePasswordResponse.json();
    
                // Information came back as correct
                if (changePasswordResponse.status === 200) {
                    setError({message: ['Success - you will recieve an email with further instructions.'], success: true});

                // Information is incorrect
                } else if (changeData.data.code === 3100) {
                    setError({message: ["Error while attempting : " + changeData.message.code], success: false});
                }

			// Information is incorrect
			} else {
				setError({message: ["No account exists with this email"], success: false});
			}
            // bad oauth token
			if (data.data.code === 1030) {
				await Auth.reAuth().then(() => this.handleFormSubmit());
			}
        } catch (e) {
            return;
        }
    }

    return (<>
    <SignOnHeader />
        <div className="sign-on-wrapper">
            <div className={`title`}>
                <h2 style={{ fontWeight: '400' }}>
                    Forgot Password
                </h2>
            </div>

            <div className="error-div" style={{ paddingLeft: 5, paddingRight: 5, textAlign: 'center' }}>
                {error.message.length > 0 && 
                    <span className='error-display flex' style={{ margin: 'auto', color: `${error.success && '#008000'}` }}>{error.message}</span>}
            </div>

            <form onSubmit={handleFormSubmit} className="form-show" style={{ textAlign: 'center'}}>
                <p style={{ textAlign: 'center' }}>
                    Please enter the email that is associated with your account
                </p>
                <div className='flex login-form-input'>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    />
                </div>
                <button className="login-btn" type='submit'>
                    Send request
                </button>
            </form>

            <div className='flex form-back' style={{ marginTop: '10px' }}>
                <Link to='/login' className='forgot-info'>
                    Back to Login
                </Link>
            </div>
        </div>
        </>
    )
}

export default ForgotPassword;