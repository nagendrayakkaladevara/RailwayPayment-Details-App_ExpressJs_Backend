const Employee = require('../models/employee');

exports.updatePaymentHistory = async (req, res) => {
    const updates = req.body; 

    try {
        const updatePromises = updates.map(async (update) => {
            const { employeeId, yearOfPayment, status, amount } = update;

            // Find the employee by ID
            const employee = await Employee.findById(employeeId);
            if (!employee) {
                return { status: 'failed', message: `Employee with ID ${employeeId} not found` };
            }

            const employeeName = employee.name;

            // Find the payment history entry to update based on yearOfPayment
            const paymentEntry = employee.paymentHistory.find(entry => entry.yearOfPayment === yearOfPayment);
            if (!paymentEntry) {
                return { status: 'failed', message: `Payment entry for year ${yearOfPayment} not found for employee ${employeeName} - ${employeeId}` };
            }

            // Update the payment history entry
            paymentEntry.status = status;
            paymentEntry.amount = amount;
            paymentEntry.updatedAt = new Date(); 

            await employee.save();
            return { status: 'success', message: `Updated payment history for employee ${employeeName} - ${employeeId} for year ${yearOfPayment}` };
        });


        const results = await Promise.all(updatePromises);

        res.status(200).send(results);
    } catch (error) {
        res.status(500).send({  status: 'error',  message: 'Error updating payment history', error });
    }
};


// payload for this put request
// [
//     {
//         "employeeId": "66b4a67236ad3122c5b8e81e",
//         "yearOfPayment": 2022,
//         "status": "unpaid",
//         "amount": 1000
//     },
//     {
//         "employeeId": "66b4a67236ad3122c5b8e81e",
//         "yearOfPayment": 2024,
//         "status": "paid",
//         "amount": 500
//     }
// ]
