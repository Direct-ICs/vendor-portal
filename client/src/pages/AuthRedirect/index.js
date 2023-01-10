import React, { useEffect, useState } from 'react';
import { gatherUserData, gatherbillData, gatherOrderData, gatherAccountData } from '../../utils/Data_Grabber';

function AuthRedirect () {

    useEffect(() => {
        document.title = 'Redirecting...';
    }, []);

    const [currentLoad, setCurrentLoad] = useState(0);

    if (sessionStorage.getItem('bills') !== null &&
        sessionStorage.getItem('orders') !== null &&
        sessionStorage.getItem('user') !== null &&
        sessionStorage.getItem('account') !== null) {
            window.location.assign('/home');
        }

    async function getbills () {
        setCurrentLoad(3);
        if (sessionStorage.getItem('bills') === null) {
            await gatherbillData();
        }
    }

    async function getOrders () {
        setCurrentLoad(2);
        if (sessionStorage.getItem('orders') === null) {
            await gatherOrderData("All");
        }
    }

    async function getUserData () {
        setCurrentLoad(1);
        if (sessionStorage.getItem('user') === null) {
            await gatherUserData();
        }
    }

    async function getAccountData () {
        setCurrentLoad(4);
        if (sessionStorage.getItem('account') === null) {
            await gatherAccountData().then(() => setCountdown(2));
        }
    }

    useEffect(() => {
        getUserData()
        .then(() => getOrders())
        .then(() => getbills())
        .then(() => getAccountData());
    }, [])

    // create countdown to redirect user,
    // assuring information is added to session storage before continuing
    const [countdown, setCountdown] = useState(-1);
    useEffect(() => {
        const timer = setTimeout(() => {
            setCountdown(countdown - 1)
        }, 1000);
        if (countdown === 0) {
            clearTimeout(timer);
            window.location.replace('/home');
        }
    });

    return (
        <div className="sign-on-wrapper">

            <div className="title">
                <h2 style={{ fontWeight: '400' }}>Successful</h2>
            </div>
            <div className="sign-on-container" style={{ textAlign: 'center' }}>
                <p>Thank you for logging in</p>
                <p>Please wait while we fetch your information...</p>
                <div className='bar-load flex'>
                    <div className='load-section' style={{ width: `${currentLoad * 25}%` }} />
                </div>
            </div>
            <div className={`modal-background`} style={{ backgroundColor: 'transparent' }} />
        </div>
    );
};

export default AuthRedirect;