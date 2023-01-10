const { default: axios } = require("axios");
const path = require('path');
let zohoConfig;
zohoConfig = require('../utils/zoho.config');

// /statements/
const statementController = {
    async getStatement(req, res) {
        axios({
            method: 'get',
            url: `https://books.zoho.com/api/v3/vendors/${req.query.contact_id}/statements/?organization_id=${zohoConfig.organization_id}&start_date=${req.query.start}&end_date=${req.query.end}&include=html`,
            headers: {
                Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
            },
            responseType: 'arraybuffer'
        })
        .then(response => {
            res.status(200).send(response.data);
        }) 
        .catch(error => {
            res.status(401).json({ message: error.message.data });
        });
    },
}

module.exports = statementController;