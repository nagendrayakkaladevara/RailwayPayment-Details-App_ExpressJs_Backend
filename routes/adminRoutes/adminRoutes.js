const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController');
const basicAuthMiddleware = require('../../middleware/basicAuth');

// Update payment history
router.put('/updatePaymentHistory', basicAuthMiddleware, adminController.updatePaymentHistory); // api/v1/admin/updatePaymentHistory

// Create payment history
router.post('/createPaymentHistory', basicAuthMiddleware, adminController.createPaymentHistory); // api/v1/admin/createPaymentHistory

// Delete payment history
router.delete('/deletePaymentHistory', basicAuthMiddleware, adminController.deletePaymentHistory); // api/v1/admin/deletePaymentHistory


module.exports = router;