const { default: axios } = require("axios");
const path = require('path');
let zohoConfig;
zohoConfig = require('../utils/zoho.config');

// /orders/
const orderController = {
    // /orders/
    // -- GET all orders for list view
    async getAllOrders(req, res) {
        console.log(req.params.filter)
        axios({
            method: 'get',
            url: `https://books.zoho.com/api/v3/purchaseorders`,
                method: 'get',
                headers: {
                    Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
                    Accept: 'application/json'
                },
                params: {
                    organization_id: zohoConfig.organization_id,
                    vendor_id: req.params.account_id,
                    filter_by: req.params.filter
                }
        })
        .then(response => {
            const POs = response.data.purchaseorders.filter(purchaseorder => purchaseorder.status !== "pending_approval" && purchaseorder.status !== "approved");
            const updateData = POs.map(({
                purchaseorder_number, purchaseorder_id, reference_number, date, total, currency_code, status
            }) => {
                return { purchaseorder_number, purchaseorder_id, reference_number, date, total, currency_code, status };
            });
            res.status(200).json({ data: updateData });
        })
        .catch(error => {
            console.log(error)
            res.status(401).json({ message: error.response.data });
        });
    },

    // /orders/:order_id
    // -- GET order by id, information in json form
    async getSingleOrder(req, res) {
        axios({
          method: "get",
          url: `https://books.zoho.com/api/v3/purchaseorders${req.url}?organization_id=${zohoConfig.organization_id}`,
          headers: {
            Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
            Accept: "application/json",
          },
        })
          .then((response) => {
            res.status(200).json({ data: response.data.purchaseorder });
          })
          .catch((error) => {
            res.status(401).json({ message: error.response });
          });
    },

    // /orders/:order_id/
    // -- POST request for getting HTML view of order (for displaying under single order view)
    async getOrderHTML(req, res) {
        axios({
            method: 'get',
            url: `https://books.zoho.com/api/v3/purchaseorders${req.url}?organization_id=${zohoConfig.organization_id}`,
                headers: {
                    Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
                    Accept: 'text/html'
                }
        })
        .then(response => {
            res.status(200).json({ data: response.data });
        })
        .catch(error => {
            res.status(401).json({ message: error.response.data });
        });
    },

    // /orders/:order_id/pdf
    // -- GET PDF view of order (for printing and downloading)
    async getOrderPdf(req, res) {
        axios({
            method: 'get',
            url: `https://books.zoho.com/api/v3/purchaseorders/${req.params.order_id}?organization_id=${zohoConfig.organization_id}&accept=pdf`,
                headers: {
                    Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
                },
                responseType: 'arraybuffer'
            })
        .then(response => {
            res.status(200).send(response.data);
        })
        .catch(error => {
            res.status(401).json({ message: error.response.data });
        });
    },

    async getOrderPrint(req, res) {
        axios({
            method: 'get',
            url: `https://books.zoho.com/api/v3/purchaseorders/${req.params.order_id}?organization_id=${zohoConfig.organization_id}&accept=pdf&print=true&frameorigin=https://books.zoho.com`,
            headers: {
                Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
            },
            responseType: 'arraybuffer'
            // Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
        })
        .then((data) => {
            res.status(200).send(data.data);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
    }
};

module.exports = orderController;