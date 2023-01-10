import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { gatherPaymentData } from '../../utils/Data_Grabber';
import { formatPrice, formatDate } from '../../utils/helpers';

function Payments () {
    let navigate = useNavigate();

    useEffect(() => {
        document.title = 'DCI Vendor Portal | Payments';
    }, []);
    useEffect(() => {
        getPayments().then(() => setLoading(false));
    }, [])

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getPayments () {
        if (sessionStorage.getItem('payments') === null) {
            setPayments(await gatherPaymentData());
        } else {
            setPayments(JSON.parse(sessionStorage.getItem('payments')));
        }
    }

    return (<>
        {loading && <Loading />}
        <div className={`bills-container ${loading && 'hidden'}`}>
            <h2 className='list-header'>Payments</h2>

            <table className='table'>
                <thead>
                    <tr>
                        <th>Payment #</th>
                        <th>Date</th>
                        <th>References</th>
                        <th>Amount</th>
                        <th>Payment Mode</th>
                    </tr>
                </thead>
                <tbody>
                    {payments && payments.length > 0
                    && 
                    (payments.map(payment => (
                        <tr key={payment.payment_id}>
                            <th style={{ paddingLeft: '5px' }}>
                                <span className={`link`}
                                    onClick={(e) => 
                                        navigate('/payments/' + payment.payment_id)
                                    }
                                    >
                                {payment.payment_number}
                                </span>
                            </th>
                            <th>{formatDate(payment.date)}</th>
                            <th>{payment.reference_number}</th>
                            <th>{formatPrice(payment.amount)}</th>
                            <th>{payment.payment_mode}</th>
                        </tr>
                    )))}
                    </tbody>
                </table>

                {(!payments || payments.length === 0) 
                &&
                (
                    <div className='no-data'>
                        No payments have been made
                    </div>
                )}
        </div>
    </>)
}

export default Payments;