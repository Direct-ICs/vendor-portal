import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate, formatPrice, spaceAndCapitalize } from "../../utils/helpers";

function SingleOrderList ({order}) {
    const {
        purchaseorder_number,
        purchaseorder_id,
        reference_number,
        date,
        total,
        status
    } = order;

    let navigate = useNavigate(); 
    const routeChange = () => {  
        navigate(`/orders/${purchaseorder_id}`);
    }
    const getStatusColor = (status) => {
        if (status === "open")
            return '#58ade5';
        else if (status === "cancelled")
            return '#df7508';
        else if (status === "billed" || "partially billed")
            return '#28a745';
    }

    return (
        <tr className='order grid-row' id={purchaseorder_id} onClick={routeChange}>
            <th className=''>{purchaseorder_number}</th>
            <th className=''>{reference_number}</th>
            <th className=''>{formatDate(date)}</th>
            <th className=''>{formatPrice(total, 'en-US', order.currency_code)}</th>
            <th style={{ color: `${getStatusColor(status)}` }}>{spaceAndCapitalize(status)}</th>
        </tr>
    )
};

export default SingleOrderList;