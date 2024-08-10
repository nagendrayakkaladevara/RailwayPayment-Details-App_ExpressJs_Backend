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

// Add a new employee
router.post('/addEmployee', basicAuthMiddleware, adminController.addEmployee); // api/v1/admin/addEmployee

// Get total amount collected for each year of payment
router.get('/totalAmountByYear', basicAuthMiddleware, adminController.getTotalAmountByYear); // api/v1/admin/addEmployee

// Get number of employees in each department
router.get('/countByDepartment', basicAuthMiddleware, adminController.getCountByDepartment); // api/v1/admin/countByDepartment

// // Get department-wise total amount for a specific year
// router.get('/totalAmountByDepartment/:year', basicAuthMiddleware, adminController.getTotalAmountByDepartment); // api/v1/admin/totalAmountByDepartment/:year

// Get department-wise total amount for paid statuses
router.get('/totalPaidAmountByDepartment', basicAuthMiddleware, adminController.getTotalPaidAmountByDepartment);

module.exports = router;