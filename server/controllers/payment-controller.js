const { default: axios } = require("axios");
const path = require('path');
let zohoConfig;
// if (process.env.NODE_ENV === 'production') {
//   zohoConfig = require(path.join(__dirname, '../../', '/private_html/utils/zoho.config'));
// } else {
  zohoConfig = require('../utils/zoho.config');
// }

// /payments/
const paymentController = {
    async getAllPayments(req, res) {
        axios({
            method: 'get',
            url: `https://books.zoho.com/api/v3/vendorpayments?organization_id=${zohoConfig.organization_id}&vendor_id=${req.params.account_id}`,
                method: 'get',
                headers: {
                    Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
                    Accept: 'application/json'
                }
        })
        .then(response => {
            let updatedData;
            response.data.vendorpayments.length > 0 ? (
                updatedData =  response.data.vendorpayments.map(({ 
                    bill_numbers, 
                    description, 
                    payment_id, 
                    date, 
                    payment_number, 
                    amount, 
                    payment_mode,
                    reference_number
                }) => {
                    return { 
                        bill_numbers, 
                        description, 
                        payment_id, 
                        date, 
                        payment_number, 
                        amount, 
                        payment_mode,
                        reference_number
                    }
                })
            ) :
            (
                updatedData = response.data.vendorpayments
            )
            res.status(200).json({ data: updatedData });
            return;
        })
        .catch(error => {
            res.status(401).json({ message: error.response.data });
        });
    },
}

module.exports = paymentController;