const { default: axios } = require("axios");
const zohoConfig = require('../utils/zoho.config');

// /api/comments/
const commentController = {
    // /comments/:purchaseorder_id
    async getComments(req, res) {
        axios({
            url: "https://books.zoho.com/api/v3/" + req.params.type + "/" + req.params.id + "/comments/?organization_id=" + zohoConfig.organization_id,
            method: "GET",
            headers: {
                Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
                Accept: 'application/json'
            }
        })
        .then((response) => {
            const filtered = response.data.comments.filter(comment => comment.comment_type === "internal");
            res.status(200).json({ data: filtered });
        })
        .catch((err) => {
            // console.log(err);
            res.status(401).json(err);
        })
    },

    async submitComment(req, res) {
        axios({
            url: "https://books.zoho.com/api/v3/" + req.params.type + "/" + req.params.id + "/comments?organization_id=" + zohoConfig.organization_id,
            method: "POST",
            headers: {
                Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
                Accept: 'application/json'
            },
            data: req.body
        })
        .then((response) => {
            res.status(200).json(response.data);
        })
        .catch((err) => {
            res.status(401).json({ error: err });
        })
    }
}

module.exports = commentController;