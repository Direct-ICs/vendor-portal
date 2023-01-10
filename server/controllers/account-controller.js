const { default: axios } = require("axios");
const zohoConfig = require('../utils/zoho.config');

// /api/accounts/
const accountController = {
    // /accounts/:account_id
    async getAccountData(req, res) {
        axios({
            method: 'get',
            url: `https://books.zoho.com/api/v3/contacts/${req.params.account_id}?organization_id=${zohoConfig.organization_id}`,
            headers: {
                Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
                Accept: 'application/json'
            }
        })
        .then(response => {
            let { company_name, contact_name, billing_address, shipping_address, contact_persons } = response.data.contact;
            contact_persons.length > 0 && (
                contact_persons = contact_persons.map(({ first_name, last_name, phone, email, department, mobile, contact_person_id, photo_url }) => {
                    return { first_name, last_name, phone, email, department, mobile, contact_person_id, photo_url };
                })
            );
            
            const updateData = { contact: { company_name, contact_name, billing_address, shipping_address, contact_persons } };
            
            res.status(200).json({ data: updateData });
        })
        .catch(err => {
            res.status(401).json({ message: err.data })
        })
    },

    // /accounts/?search=company_name
    async findAccountByName (req, res) {
        axios({
            method: 'get',
            url: `https://books.zoho.com/api/v3/contacts?organization_id=${zohoConfig.organization_id}&company_name_contains=${req.query.search}`,
            headers: {
                Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
                Accept: 'application/json'
            }
        })
        .then(response => {
            res.status(200).json({ data: response.data, account_id: response.data.contacts[0].contact_id });
        })
        .catch(err => {
            res.status(400).json({ message: 'no company found with that name' });
        })
    },

    async getUserByEmail (req, res) {
        axios({
            method: 'get',
            url: `https://books.zoho.com/api/v3/contacts?organization_id=${zohoConfig.organization_id}&email_contains=${req.query.search}`,
            headers: {
                Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
                Accept: 'application/json'
            }
        })
        .then(response => {
            res.status(200).json({ contact_id: response.contacts[0].contact_id, account_id: response.data.contacts[0].contact_id });
        })
        .catch(err => {
            res.status(400).json({ message: 'No account found with that email' });
        })
    }
}

module.exports = accountController;