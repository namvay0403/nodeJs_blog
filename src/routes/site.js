const express = require('express');
const route = express.Router();

const siteController = require('../app/controllers/SiteController');

route.get('/search', siteController.search);
route.get('/', siteController.home);

module.exports = route;
