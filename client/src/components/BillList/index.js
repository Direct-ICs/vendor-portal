import React from 'react';
import { useNavigate } from "react-router-dom";
import { spaceAndCapitalize, formatPrice, formatDate } from '../../utils/helpers';

function BillList ({ bill }) {
    const handlePaidStatus = (status) => {
        if (status === 'paid') {
            return 'green';
        } else if (status === 'overdue') {
            return 'red';
        } else if (status === 'partially_paid') {
            return 'orange';
        }
    }

    let navigate = useNavigate(); 
    const routeChange = () => {  
        navigate(`/bills/${bill.bill_id}`);
    }

    return (
        <tr className='order' key={bill.bill_id} id={bill.bill_id} onClick={routeChange}>
            <th width="15%" className=''>{bill.bill_number}</th>
            {/* <th width="40%">{bill.reference_number.match(/(SO|INV)?\-?[0-9]*/}{/*gi)}</th> */}
            <th width="15%">{formatDate(bill.date)}</th>
            <th width="15%" style={{ letterSpacing: "0.03rem" }}>{formatPrice(bill.total, 'en-US', bill.currency_code)}</th>
            <th width="15%"
                style={{color: handlePaidStatus(bill.status)}}
            >
                {spaceAndCapitalize(bill.status)}
            </th>
        </tr>
    );
}

export default BillList;