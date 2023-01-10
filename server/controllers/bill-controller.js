const { default: axios } = require("axios");
const path = require('path');
let zohoConfig;
// if (process.env.NODE_ENV === 'production') {
//   zohoConfig = require(path.join(__dirname, '../../', '/private_html/utils/zoho.config'));
// } else {
  zohoConfig = require('../utils/zoho.config');
// }

// /bills/
const billController = {
    // /bills/
    // -- GET all bills as list
    async getAllbills(req, res) {
        axios({
            method: 'get',
            url: `https://books.zoho.com/api/v3/bills?organization_id=${zohoConfig.organization_id}&vendor_id=${req.params.account_id}&filter_by=Status.${req.params.filter}`,
                method: 'get',
                headers: {
                    Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
                    Accept: 'application/json'
                }
        })
        .then(response => {
            let bills = response.data.bills;
            const updateData = bills.map(({
                    status, bill_id, bill_number, balance, due_date, reference_number, date, total, currency_code
                }) => {
                return { status, bill_id, bill_number, balance, due_date, reference_number, date, total, currency_code};
            });

            res.status(200).json({ data: updateData });
            return;
        })
        .catch(error => {
            res.status(401).json({ message: error.response.data });
        });
    },

    // /bills/:bill_id
    // -- POST request, but gets bill as HTML for view in single bill view
    async getbillHTML(req, res) {
        axios({
            method: 'get',
            url: `https://books.zoho.com/api/v3/bills${req.url}?organization_id=${zohoConfig.organization_id}`,
            headers: {
                Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
                Accept: 'text/html'
            }
        })
        .then(response => {
            res.status(200).json({ data: response.data });
            return;
        })
        .catch(error => {
            res.status(401).json({ message: error.response.data });
        });
    },

    // /bills/:bill_id
    // -- GET bill by id, information in json form
    async getSinglebill(req, res) {
        axios({
          method: "get",
          url: `https://books.zoho.com/api/v3/bills${req.url}?organization_id=${zohoConfig.organization_id}`,
          headers: {
            Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
            Accept: "application/json",
          },
        })
        .then((response) => {
            let { customer_name, custom_field_hash, bill_number, line_items } = response.data.bill;
            custom_field_hash = custom_field_hash.cf_customer_po;
            line_items = line_items.map(({ name, item_id, quantity, unit, description }) => {
                return { name, item_id, quantity, unit, description };
            });
            
            const updateData = { bill: { customer_name, custom_field_hash, bill_number, line_items } };

            res.status(200).json({ data: updateData });
            return;
          })
        .catch((error) => {
            res.status(401).json({ message: error.response });
          });
    },

    // /bills/:bill_id/pdf
    // -- GET PDF view of bill (for printing and downloading)
    async getbillPdf(req, res) {
        axios({
            method: 'get',
            url: `https://books.zoho.com/api/v3/bills/${req.params.bill_id}?organization_id=${zohoConfig.organization_id}&accept=pdf`,
            headers: {
                Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
            },
            responseType: 'arraybuffer'
        })
        .then(response => {
            res.status(200).send(response.data);
        })
        .catch(error => {
            res.status(401).json({ message: error });
        });
    },
};

module.exports = billController;