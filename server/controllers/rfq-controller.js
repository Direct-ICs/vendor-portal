const { default: axios } = require("axios");
const zohoConfig = require('../utils/zoho.config');

// /api/rfq/
const rfqController = {
    // /`pending
    async getPendingData(req, res) {
        axios({
            method: 'get',
            url: `https://creatorapp.zohopublic.com/directcomponents/crm-integrations/report-embed/RFQ_Pending_NEW/NDYFU8Us4Xdu9qrwCNK2FugWdxnnUkVOvPHOeB2jQyA4bsHk1EJvA1gPNNe5NTsDUxJ8U92nb2WbUGsR2xh47YHxqhT8g9YVWMf1`,
            params: {
                "Vendor.ID": "4128292000017867024"
            }
        })
        .then(response => {
            console.log(response);
            
            res.status(200).json(response.data);
        })
        .catch(err => {
            res.status(401).json({ message: err.data })
        })
    }
}

module.exports = rfqController;