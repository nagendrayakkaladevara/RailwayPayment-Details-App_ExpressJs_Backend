const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController');
const basicAuthMiddleware = require('../../middleware/basicAuth');

// Update payment history
router.put('/updatePaymentHistory', basicAuthMiddleware, adminController.updatePaymentHistory); // api/v1/admin/updatePaymentHistory

module.exports = router;