import React from 'react';
import Box from './Box';

const trackingFunc = () => { 
    let returnObj = {noTracking: [], shipped: [], recent: []};

    JSON.parse(sessionStorage.getItem("orders")).forEach(order => {
        try {
        if (order.packages.length === 0) {
            returnObj.noTracking.push(order);
        } else {
            order.packages.forEach(pkg => {
                const date = new Date(pkg.shipment_date);
                // add to recent tracking if shipped within last 5 days
                if ((Math.abs(new Date() - date.getTime()) / (1000 * 60 * 60 * 24)) < 5)
                {
                    returnObj.recent.push({
                        purchaseorder_id: order.purchaseorder_id, 
                        purchaseorder_number: order.purchaseorder_number,
                        date: order.date,
                        package: pkg
                    });
                }
            })
            returnObj.shipped.push(order);
        }
    } catch (TypeError) {
    }
    });
    return returnObj;
}

function Tracking () {
    // get tracking information
    const tracking = trackingFunc();
    // for all sales orders, list the tracking information if there is any
    // how do I list them in a way that makes sense and is good?
    // 2 categories? 
    // No tracking
    // Recently Shipped (Within 5 days)
    // Shipped
    return (
        <div className='tracking-container'>
            <Box tracking={tracking.noTracking} title={"Pending Shipment"} background={"linear-gradient(100deg, #fafafa 0%, rgba(173,216,230,.8) 0%)"} />
            <Box tracking={tracking.recent} title={"Recently Shipped"} background={"linear-gradient(100deg, #fafafa 0%, rgba(255,255,200,1) 0%)"} />
            <Box tracking={tracking.shipped} title={"Past Shipped"} background={"linear-gradient(100deg, rgba(250,250,250,1) 0%, rgba(144,238,144,.6) 0%)"} />
        </div>
    );
}

export default Tracking;