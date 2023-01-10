const express = require('express');
const path = require('path');
const apiRoutes = require('./routes');

const jwt = require('jsonwebtoken');
const session = require('express-session');

const { default: axios } = require('axios');

const fileUpload = require('express-fileupload');
let zohoConfig;
// if (process.env.NODE_ENV === 'production') {
//   zohoConfig = require(path.join(__dirname, '../', '/private_html/utils/zoho.config'));
// } else {
  zohoConfig = require('./utils/zoho.config');
// }
var LocalStorage = require('node-localstorage').LocalStorage;

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(session({ secret: 'shhthisisasecret', cookie: { maxAge: 3600 }}));

app.use(fileUpload());

if (process.env.NODE_ENV === 'production') {
  localStorage = new LocalStorage(path.join(__dirname, '../', '/private_html/scratch'));
  app.use(express.static(path.join(__dirname, '../public_html/build/')));
} else {
  localStorage = new LocalStorage('./scratch');
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(apiRoutes);

app.get('/*', function (req, res) {
  if (process.env.NODE_ENV === 'production') {
    // res.sendFile(path.join(__dirname, '/build/index.html'));
    res.sendFile(path.join(__dirname, '../public_html/build/index.html'));
  } else {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  }
});

// set up auto reauth for access token every 55 minutes
function autoRefresh () {
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
            console.log('Token refreshed');
      })
    .catch(err => {
        console.log(err.message);
    });
    setTimeout(autoRefresh, 3300000);
  }

autoRefresh();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}!`);
});