const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const basicAuthMiddleware = require('../../middleware/basicAuth');

router.get('/getTotalData', basicAuthMiddleware, userController.getTotalDetails); // api/v1/user/getTotalData
// router.post('/getByName', userController.createWebsite);
// router.get('/history/:websiteId', userController.getWebsiteHistory);

module.exports = router;