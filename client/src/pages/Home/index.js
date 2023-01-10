import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, getTimeOfDay } from '../../utils/helpers';
import { formatPrice } from '../../utils/helpers';
import Auth from '../../utils/auth';
import { GrEdit } from 'react-icons/gr';
import { HiOutlinePhone } from 'react-icons/hi';
import AddContactModal from './AddContactModal';
import EditContact from './EditContact';

const orders = JSON.parse(sessionStorage.getItem('orders'));
const bills = JSON.parse(sessionStorage.getItem('bills'));

function Home () {
    
    const [newContactModalOpen, setContactModalOpen] = useState(false);
    const [editContactModalOpen, setEditModal] = useState(false);
    const [account, setAccount] = useState(JSON.parse(sessionStorage.getItem('account')));
    const [users, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));

    ((orders === null || bills === null || users === null || account === null)) && window.location.assign('/auth/redirect');


    useEffect(() => {
        document.title = 'DCI Vendor Portal | Home';
    }, []);

    function getUserName () {
        try {
            return `${users.first_name} 
                ${users.last_name}`;
        } catch (e) {
            return ``;
        }
    }

    function sumOfOrders () {
        return orders ? parseInt(orders
            .reduce(function(a, b){
                return a + b.total;
            }, 0)) : 0;
    }
    function avgOfOrders () {
        return orders ? parseInt(orders
            .reduce(function(a, b){
                return a + b.total;
            }, 0) / orders.length) : 0;
    }
    function totalOrders () {
        return orders ? orders.length : 0;
    }

    // get overdue bill and sort by oldest on top
    function overDuebills () {
        return bills 
            ? bills
                .filter(bill => bill.status === "overdue")
                .sort(function(a, b) {
                    if (a.due_date > b.due_date) {
                        return 1;
                    } else {
                        return -1;
                    }
                })
            : [];
    }
    function overDueTotal () {
        return overDuebills()
            .reduce(function(a, b) {
                return a + b.balance;
            }, 0);
    }

    let navigate = useNavigate();

    return (
        <section>
            {newContactModalOpen && (
                <AddContactModal setModalOpen={setContactModalOpen} setAccount={setAccount} />
            )}
            {editContactModalOpen && (
                <EditContact setEditModal={setEditModal} user={users} setUser={setUser} setAccount={setAccount} account={account} />
            )}
            <div id="home-header">
                {getTimeOfDay()}, {getUserName()}
            </div>
            {/* bills overview */}
            <div className='home-section'>
                <h2 className='section-title'>bills</h2>
                <div className='home-inner-section' style={{ }}>
                    <h2 style={{ fontWeight: '500', marginTop: 0 }}>
                        Outstanding - <span style={{ fontWeight: 600, color: `${overDueTotal() > 0 && 'red'}` }}>{formatPrice(overDueTotal())}</span>
                    </h2>
                    <div id="home-bills">
                        {overDuebills().length > 0
                        ? (
                            <div className='flex' style={{ flexDirection: 'column', width: '100%' }}>
                                <div className='flex' style={{ justifyContent: 'space-between' }}>
                                    <span>bill #</span>
                                    <span>Balance</span>
                                    <span>Due Date</span>
                                </div>
                            {overDuebills().map(bill => (
                                <div className='flex' key={bill.bill_id} style={{justifyContent: 'space-between', padding: '10px 0' }}>
                                    <span className='link' onClick={(e) => navigate('/bills/' + bill.bill_id)}>{bill.bill_number}</span>
                                    <span>{formatPrice(bill.balance)}</span>
                                    <span>{formatDate(bill.due_date)}</span>
                                </div>
                            ))}
                            </div>
                        )
                        : 
                         (<h3 style={{ fontWeight: 500, marginTop: 0, marginLeft: '10px' }}>No bills overdue, you're up to date</h3>)
                        }
                    </div>
                </div>
            </div>
            {/* Sales overview */}
            <div className='home-section'>
                <h2 className='section-title'>Sales Orders</h2>
                <div className='home-inner-section flex' style={{ justifyContent: 'space-around' }}>
                    <div className=''>
                    <p className='bubble-footer'>Total Orders</p>
                        <h2 className='bubble-header'>{totalOrders()}</h2>
                    </div>
                    <div className=''>
                        <p className='bubble-footer'>Sum of Orders</p>
                        <h2 className='bubble-header'>{formatPrice(sumOfOrders())}</h2>
                    </div>
                    <div className=''>
                        <p className='bubble-footer'>Average Order</p>
                        <h2 className='bubble-header'>{formatPrice(avgOfOrders()) !== '$NaN' ? formatPrice(avgOfOrders()) : '$0'}</h2>
                    </div>
                </div>
            </div>
            {/* Account details */}
            <div className='home-section'>
                <h2 className='section-title'>Account Details</h2>
                {/* Current Contact info */}
                <div className='home-inner-section flex' style={{ }}>
                    <div style={{ flexGrow: 1, textAlign: 'center' }}>
                        <h3 style={{ fontWeight: '500', margin: 0 }}>{account.company_name}</h3>
                        <div className='flex' style={{ lineHeight: .5 }}>
                            <div style={{ flexGrow: 5 }}>
                                <p className='' style={{ fontWeight: 500 }}>
                                    {getUserName()}
                                </p>
                                <p className=''>
                                    {Auth.getProfile().email}
                                </p>
                                <p className=''>
                                    {users.phone}
                                </p>
                                <p className=''>
                                    {users.department}
                                </p>
                            </div>
                            <GrEdit id="edit-info-icon" style={{ fontSize: '20px', cursor: 'pointer' }} onClick={(e) => setEditModal(true)} />
                        </div>
                        <div className='flex' style={{ justifyContent: 'space-around', borderTop: '1px solid lightgrey', padding: '10px 10px' }}>
                            <div>
                                <p style={{ fontWeight: 300 }}>Billing Address</p>
                                <div style={{ lineHeight: .4 }}>
                                    {account.billing_address.address 
                                    ? ( <>
                                        <p>{account.billing_address.address}</p>
                                        <p>{account.billing_address.city} {account.billing_address.state}</p>
                                        <p>{account.billing_address.country}</p>
                                        <p>{account.billing_address.zip}</p>
                                        </>)    
                                    : ( <>
                                        <p>Yet to add billing address</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p style={{ fontWeight: 300 }}>Shipping Address</p>
                                <div style={{ lineHeight: .4 }}>
                                    {account.shipping_address.address 
                                    ? ( <>
                                        <p>{account.shipping_address.address}</p>
                                        <p>{account.shipping_address.city} {account.billing_address.state}</p>
                                        <p>{account.shipping_address.country}</p>
                                        <p>{account.shipping_address.zip}</p>
                                        </>)    
                                    : ( <>
                                        <p>Yet to add shipping address</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* All contacts in account */}
                    <div className='scroll-container' style={{ marginRight: '5px', marginLeft: '15px', paddingRight: '10px' }}>
                        {account.contact_persons.map((contact) => (
                            <div className='contact-container flex' key={contact.contact_person_id}>
                                <img className='profile-img' draggable={false} src={contact.photo_url} height='80px' width='80px' alt='Contact Face' style={{ padding: '0 20px'}} />
                                <div className='contact-info'>
                                    <div style={{ lineHeight: 1, maxWidth: '300px'}}>
                                        <p className='' style={{ fontWeight: 500 }}>{contact.first_name} {contact.last_name}</p>
                                    </div>
                                    <p className=''>{contact.department}</p>
                                    <p className=''>{contact.email}</p>
                                    <p className=''><HiOutlinePhone /> {contact.phone}</p>
                                </div>
                            </div>
                        ))}
                        {/* <div id='add-new-contact' className={`contact-container flex ${newContactModalOpen && 'clicked'}`} onClick={(e) => setContactModalOpen(true)} >
                            <p style={{ fontWeight: 500, marginLeft: '50px' }}>Add new contact...</p>
                        </div>                         */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home;