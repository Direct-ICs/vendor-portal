const { default: axios } = require("axios");
const path = require('path');
let zohoConfig;
zohoConfig = require('../utils/zoho.config');

const userController = {
    async getUserData(req, res) {
        axios({
            method: 'get',
            url: `https://books.zoho.com/api/v3/contacts/${req.body.account_id}/contactpersons/${req.body.contact_id}?organization_id=${zohoConfig.organization_id}`,
            headers: {
                Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
                Accept: 'application/json'
            }
        })
        .then(response => {
            res.status(200).json({ data: response.data });
        })
        .catch(err => {
            res.status(401).json({ message: err.response.data })
        })
    },

    async createNewContact(req, res) {
        axios({
            method: 'post',
            url: `https://books.zoho.com/api/v3/contacts/contactpersons?organization_id=${zohoConfig.organization_id}`,
            headers: {
                Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
                "Content-Type": 'application/json;charset=UTF-8'
            },
            data: req.body
        })
        .then(response => {
            res.status(200).json({ data: response.data });
        })
        .catch(err => {
            res.status(401).json({ message: err.response.data });
        })
    },

    async updateContact(req, res) {
        axios({
            method: 'put',
            url: `https://books.zoho.com/api/v3/contacts/contactpersons/${req.params.contact_person_id}?organization_id=${zohoConfig.organization_id}`,
            headers: {
                Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
                "Content-Type": 'application/json;charset=UTF-8'
            },
            data: req.body
        })
        .then(response => {
            res.status(200).json({ data: response.data });
        })
        .catch(err => {
            res.status(401).json({ message: err.response.data });
        })
    },

    // OLD - to create their info in dashboard through the website instead of going through customer service
    // async createContactForDashboard(req, res) {
    //     const { Username, Account_ID, Contact_ID } = req.body;
    //     axios({
    //         method: 'post',
    //         url: `https://creator.zoho.com/api/v2/directcomponents/customer-portal-administration/form/User_Profile`,
    //         data: {
    //             data: {
    //                 User_Name: Username,
    //                 Account_ID: Account_ID,
    //                 Contact_ID: Contact_ID,
    //                 Mandatory_Password_Change: true
    //             }
    //         },
    //         headers: {
    //             Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
    //             'Content_Type': 'application/json'
    //         }
    //     })
    //     .then(response => {
    //         res.status(200).json({ data: response.data });
    //     })
    //     .catch(err => {
    //         res.status(400).json({ message: err.data });
    //     })
    // },

    async requestDashboardAccess (req, res) {
        const { company_name, email, first_name, last_name, phone } = req.body;
        axios({
            method: 'post',
            url: `https://creator.zoho.com/api/v2/directcomponents/customer-portal-administration/form/Account_Request`,
            data: {
                data: {
                    Company_Name: company_name,
                    Email: email,
                    First_Name: first_name,
                    Last_Name: last_name,
                    Phone: phone,
                    Status: "Active"
                }
            },
            headers: {
                Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
                'Content_Type': 'application/json'
            }
        })
        .then(response => {
            res.status(200).json({ data: response.data });
        })
        .catch(err => {
            res.status(400).json({ message: err.data });
        })
    },

    async deleteContactFromDashboard(req, res) {
        axios({
            method: 'delete',
            url: `https://creator.zoho.com/api/v2/directcomponents/customer-portal-administration/report/All_User_Names/${req.params.id}`,
            headers: {
                Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`
            }
        })
        .then(response => {
            res.status(200).json({ data: response.data });
        })
        .catch(err => {
            res.status(400).json({ message: err.response.data });
        })
    },

    async getDashboardInfoByEmail (req, res) {
        axios({
            method: 'get',
            url: `https://creator.zoho.com/api/v2/directcomponents/customer-portal-administration/report/All_User_Names?User_Name=${req.params.email}`,
            headers: {
                Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`
            }
        })
        .then(response => {
            res.status(200).json({ data: response.data.data });
        })
        .catch(err => {
            res.status(400).json({ data: err.response.data });
        })
    }
}

module.exports = userController;