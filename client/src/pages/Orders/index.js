import React, { useState, useEffect } from 'react';
import SingleOrderList from '../../components/OrderList';
import Loading from '../../components/Loading';
import ListFilter from '../../components/ListFilter';
import { gatherOrderData } from '../../utils/Data_Grabber';

function Orders () {
    useEffect(() => {
        document.title = 'DCI Vendor Portal | Orders';
    }, []);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentFilter, setFilter] = useState({display: "All Invoices", api: "All"});

    useEffect(() => {
        try {
            if (orders.length === 0) {
                setOrders(JSON.parse(sessionStorage.getItem('orders')));
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
        }
    }, []);

    function doSomethingWithFilter (whatFilter) {
        setLoading(true);
        gatherOrderData(whatFilter.api)
        .then((order) => {
            setOrders(JSON.parse(order));
            setFilter(whatFilter)
            setLoading(false);
            console.log(JSON.parse(order), orders)
        })
    }

    return (
        <div className='orders-container'>
            {loading 
            ? <Loading />
            : 
            (<>
            <h2 className='list-header'>Purchase Orders</h2>
            <ListFilter filterList={doSomethingWithFilter} 
                filters={[
                    {
                        display: "All Purchase Orders",
                        api: "All"
                    },
                    {
                        display: "Billed Purchase Orders",
                        api: "Billed"
                    },
                    {
                        display: "Partially Billed Purchase Orders",
                        api: "PartiallyBilled"
                    },
                    {
                        display: "Cancelled Purchase Orders",
                        api: "Cancelled"
                    },
                    {
                        display: "Accepted Purchase Orders",
                        api: "Accepted"
                    }
                ]} 
                current={currentFilter} />

            <div className='table-wrapper'>
            <table className='table'>
                <thead>
                    <tr className='grid-row'>
                        <th className=''>Purchase Order #</th>
                        <th className=''>Reference #</th>
                        <th className=''>Date</th>
                        <th className=''>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {/* order list */}
                    {(orders && (orders.length > 0) )
                        && 
                        orders.map(order => (
                            <SingleOrderList key={order.purchaseorder_id} order={order} />
                        ))}
                </tbody>
            </table>
            </div>

            {(!orders || orders.length === 0) 
                &&
                (
                    <div className='no-data'>
                        There are no orders for your account
                    </div>
                )}
            </>)}
        </div>
    );
}

export default Orders;