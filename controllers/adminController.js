const Employee = require('../models/employee');

exports.updatePaymentHistory = async (req, res) => {
    const updates = req.body; // Expect an array of updates in the request body

    try {
        const updatePromises = updates.map(async (update) => {
            const { employeeId, paymentId, yearOfPayment, status, amount } = update;

            // Find the employee by ID
            const employee = await Employee.findById(employeeId);
            if (!employee) {
                return { status: 'error', message: `Employee with ID ${employeeId} not found` };
            }

            // Find the payment history entry to update
            const paymentEntry = employee.paymentHistory.id(paymentId);
            if (!paymentEntry) {
                return { status: 'error', message: `Payment entry with ID ${paymentId} not found` };
            }

            // Update the payment history entry
            paymentEntry.yearOfPayment = yearOfPayment;
            paymentEntry.status = status;
            paymentEntry.amount = amount;

            await employee.save();
            return { status: 'success', message: `Updated payment history for employee ${employeeId}` };
        });

        // Wait for all updates to complete
        const results = await Promise.all(updatePromises);

        res.status(200).send(results);
    } catch (error) {
        res.status(500).send({ msg: 'Error updating payment history', error });
    }
};