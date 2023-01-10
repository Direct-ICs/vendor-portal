import Auth from "./auth";

export async function gatherUserData () {
    const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          account_id: Auth.getProfile().books_account_id,
          contact_id: Auth.getProfile().books_contact_id
        }),
        headers : {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();

    if (response.ok) {
        sessionStorage.setItem('user', JSON.stringify(data.data.contact_person));
        return JSON.stringify(data.data.contact_person);
    } else {
        // if (response.statusText === 'Unauthorized') {
        //     // await Auth.reAuth().then(() => this.gatherUserData());
        // }
        // if (data.message.code === 1002) {
        //     // contact person does not exist in Zoho Books, delete from customer dashboard
        //     const response = await fetch('/api/users/dashboard/' + Auth.getProfile().zoho_id, {
        //         method: 'delete',
        //     });
        //     if (response.ok) {
        //         Auth.logout();
        //     } else {
        //         const data = await response.json();
        //         console.log('Error while deleting account:', data.message);
        //     }
        // } else {
        //     console.error('Error while fetching user data');
        // }
    }
}

export async function gatherAccountData () {
    const response = await fetch('/api/accounts/' + Auth.getProfile().books_account_id, {
        method: 'get'
    });

    const data = await response.json();

    if (response.ok) {
        sessionStorage.setItem('account', JSON.stringify(data.data.contact));
        return data.data;
    } else {
        console.error('Error while fetching account data');
    }
}

export async function gatherOrderData (status) {
    const response = await fetch('/api/orders/all/' + Auth.getProfile().books_account_id + '/Status.' + status, {
        method: 'get'
    });

    const data = await response.json();

    if (response.ok) {
        sessionStorage.setItem('orders', JSON.stringify(data.data));
        return JSON.stringify(data.data);
    } else {
        console.error('Error while fetching order data');
    }
}

export async function gatherbillData (status) {
    const response = await fetch('/api/bills/all/' + Auth.getProfile().books_account_id + '/' + status, {
        method: 'get'
    });

    const data = await response.json();

    if (response.ok) {
        sessionStorage.setItem('bills', JSON.stringify(data.data));
        return JSON.stringify(data.data);
    } else {
        console.error('Error while fetching bill data');
    }
}

export async function gatherPaymentData () {
    const response = await fetch('/api/payments/' + Auth.getProfile().books_account_id, {
        method: 'get'
    });

    const data = await response.json();

    if (response.ok) {
        sessionStorage.setItem('payments', JSON.stringify(data.data));
        return data.data;
    } else {
        console.error('Error while fetching payment data');
    }
}

export function getTrackingAndbillData (orders) {

    orders.forEach(async (order, index) => {
        const orderResponse = await fetch('/api/orders/' + order.purchaseorder_id, {
            method: 'get'
        });
        const {data} = await orderResponse.json();

        if (orderResponse.ok) {
            order.packages = data.purchaseorder.packages;
            order.bills = data.purchaseorder.bills;
        }
        let updatedOrders = JSON.parse(sessionStorage.getItem("orders"));
        updatedOrders[index] = order;
        sessionStorage.setItem("orders", JSON.stringify(updatedOrders));
    });
}