import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SignOnHeader from '../SignOn/SignOnHeader';
import { BsCheckCircle } from 'react-icons/bs';

function GetLoginDetails () {
    const [stage, setStage] = useState(1);

    useEffect(() => {
        document.title = 'DCI Vendor Portal | Login';
    }, []);


    const submitData = (e) => {
        e.preventDefault();
        let form = {};
        
        for (var i = 0; i < e.target.length; i++) {
            const name = e.target[i].name;
            form[name] = e.target[i].value;
        }

        // post data to form in customer database
        fetch('/api/users/dashboard', {
            method: 'post',
            body: JSON.stringify(form),
            headers : {
                "Content-Type": "application/json"
            }
        })
        .catch((err) => {
            console.log(err);
        })

        setStage(2);
    }

    return (<>
        <SignOnHeader />
        <div className="sign-on-wrapper">
            <div className={`title ${stage < 2 ? 'form-show' : 'form-hide'}`}>
                <h2 style={{ fontWeight: '400' }}>
                    Get Login Details
                </h2>
            </div>
            
            <form className={`${stage === 1 ? 'form-show' : 'form-hide'}`} style={{ textAlign: 'center'}} onSubmit={submitData}>
                <p style={{ textAlign: 'center' }}>
                    Please enter the company you are affiliated with
                </p>
                <div className='flex login-form-input'>
                    <input
                        type="text"
                        name="company_name"
                        placeholder="Company name"
                        required
                    />
                </div>

                <p style={{ textAlign: 'center' }}>
                    Please enter your business email
                </p>
                <div className='flex login-form-input'>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    />
                </div>

                <div style={{ display: 'flex' }}>
                    <div>
                        <p style={{ textAlign: 'center' }}>
                            First name
                        </p>
                        <div className='flex login-form-input' style={{ minWidth: 'auto'}}>
                            <input
                                type="text"
                                name="first_name"
                                placeholder="First name"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <p style={{ textAlign: 'center' }}>
                            Last name
                        </p>
                        <div className='flex login-form-input' style={{ minWidth: 'auto'}}>
                            <input
                                type="text"
                                name="last_name"
                                placeholder="Last name"
                                required
                            />
                        </div>
                    </div>
                </div>

                <p style={{ textAlign: 'center' }}>
                    Phone number
                </p>
                <div className='flex login-form-input'>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone number"
                        required
                    />
                </div>
                <button className="login-btn" type='submit' style={{ marginTop: '15px' }}>
                    Request Access
                </button>
            </form>

            <div className={`${stage === 2 ? 'form-show' : 'form-hide'}`} style={{ textAlign: 'center', borderBottom: '1px solid lightgrey', paddingBottom: '15px' }} >
                <div>
                    <BsCheckCircle style={{ color: 'green', fontSize: '5rem', margin: '15px 0' }} />
                </div>
                <span>
                    Your information was sent to our customer service team for review. Once completed, further instructions will be sent to the email provided.
                    <br/><br/>Note: This could take up to 5 business days.
                    <br/><br/>Please <b>do not</b> submit multiple requests.
                </span>
            </div>

            <div className='flex form-back' style={{ marginTop: '10px' }}>
                <Link to='/login' className='forgot-info'>
                    Back to Login
                </Link>
            </div>
        </div>
    </>
    );
}

export default GetLoginDetails;