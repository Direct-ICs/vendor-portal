const router = require('express').Router();
const { default: axios } = require('axios');
const zohoConfig = require('../../utils/zoho.config');

const url = require('url');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// /auth
// Login into application using own database
router.post('/login', (req, res) => {
    axios({
        method: 'GET',
        url: `https://creatorapp.zoho.com/api/v2/directcomponents/customer-portal-administration/report/All_Vendor_Users?User_Name=${req.body.email}`,
        headers: {
            Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
            Accept: 'application/json'
        }
    })
    .then(response => {
        // DECRYPT password here and check vs password sent
        bcrypt.compare(req.body.password, response.data.data[0].Password, function(err, result) {
            if (!result && req.body.password !== response.data.data[0].Password)
                return res.status(401).json({ message: response.data });

            const user = {
                'books_contact_id': response.data.data[0].Books_Contact_ID,
                'books_account_id': response.data.data[0].Books_Account_ID,
                'creator_account_id': response.data.data[0].Creator_Account_ID,
                'account_name': response.data.data[0].Company_Name,
                'email': response.data.data[0].User_Name,
                'zoho_id': response.data.data[0].ID
            }
            const token = jwt.sign(user, zohoConfig.secret, { expiresIn: '3h' }); // 3 hours
            const resp = {
                "status": "Logged in",
                "token": token,
            }
           
            return res.status(200).json({ resp, passwordChange: response.data.data[0].Mandatory_Password_Change});
        });
    })
    .catch(err => {
        try {
            // no data was returned; aka no account exists with given information
            if (err.response.data.code === 3100)
                res.status(400).json({ message: err.response.data });
        } catch (e) {
            res.status(400).json({ message: err.response.data });
        }
    })
});

router.post('/password', (req, res) => {
    axios({
        method: 'GET',
        url: `https://creatorapp.zoho.com/api/v2/directcomponents/customer-portal-administration/report/All_Vendor_Users?User_Name=${req.body.email}`,
        headers: {
            Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
            Accept: 'application/json'
        }
    })
    .then(response => {
        bcrypt.compare(req.body.password, response.data.data[0].Password, function(err, result) {
            if(result) {
                res.json(true);
                return;
            } else {
                if (req.body.password === response.data.data[0].Password) {
                    res.json(true);
                    return;
                }
                res.json(false);
                return;
            }
        })
    })
    .catch(err => {
        return;
    })
})

router.post('/changepass', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if (!err) {
            axios({
                method: 'PATCH',
                url: `https://creator.zoho.com/api/v2/directcomponents/customer-portal-administration/report/All_Vendor_Users/${req.body.id}`,
                data: {
                    data: {
                        Password: hash,
                        Mandatory_Password_Change: false
                    }
                },
                headers: {
                    Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
                }
            })
            .then(response => {
                res.status(200).json({ data: response.data });
            })
            .catch(err => {
                res.status(400).json({ message: err.data });
            })
        }
    });
});

router.post('/password/forgot/:id', (req, res) => {
    axios({
        method: 'PATCH',
        url: `https://creator.zoho.com/api/v2/directcomponents/customer-portal-administration/report/All_Vendor_Users/${req.params.id}`,
        data: {
            data: {
                Password: 'secret-password-to-change',
                Mandatory_Password_Change: true
            }
        },
        headers: {
            Authorization: `Zoho-oauthtoken ${localStorage.getItem('access_token')}`,
        }
    })
    .then(response => {
        res.status(200).json({ data: response.data });
    })
    .catch(err => {
        res.status(400).json({ message: err.data });
    });
})

// reup the access_token
router.get('/reauth', (req, res) => {
    axios({
        method: 'post',
        url: `https://accounts.zoho.com/oauth/v2/token?refresh_token=${localStorage.getItem('refresh_token')}&client_id=${zohoConfig.client_id}&client_secret=${zohoConfig.client_secret}&redirect_uri=${zohoConfig.redirect_url}/&grant_type=refresh_token`,
        headers: {
            "Content-Type": 'application/json'
        },
    })
    .then(response => {
        response.data.access_token !== undefined &&
            localStorage.setItem('access_token', response.data.access_token);
        res.status(200).json({ message: 'Token refreshed' });
    })
    .catch(err => {
        res.status(401).json({ message: err.response.data });
    })
});

// Auth application through Zoho
router.get('/', (req, res) => {
    res.redirect(`https://accounts.zoho.com/oauth/v2/auth?scope=${zohoConfig.scope}&client_id=${zohoConfig.client_id}&state=testing&response_type=code&redirect_uri=${zohoConfig.redirect_url}`)
});

// Redirect after authorizing with code
// return access and refresh token
router.get(`/redirecting`, (req, res) => {
    const code = url.parse(req.headers.referer, true).query.code;

    axios({
        method: 'POST',
        url: `https://accounts.zoho.com/oauth/v2/token?code=${code}&client_id=${zohoConfig.client_id}&client_secret=${zohoConfig.client_secret}&redirect_uri=${zohoConfig.redirect_url}&grant_type=authorization_code`,
    })
    .then(response => {
        if (response.data) {
            if (response.data.access_token !== undefined) {
                localStorage.setItem('access_token', response.data.access_token);
                 localStorage.setItem('access_token_exp', Date.now() + 3600);
            }
            response.data.refresh_token !== undefined &&
                localStorage.setItem('refresh_token', response.data.refresh_token);
            res.status(200).json({ access_token: response.data.access_token });
            return;
        }
    })
    .catch(err => {
        return;
    })
});

module.exports = router;