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
        res.status(500).send({ status: 'error', message: 'Error updating payment history', error });
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


// -----------------------X-X-X--------------------------------

exports.createPaymentHistory = async (req, res) => {
    const { employeeId, yearOfPayment, status, amount } = req.body;

    try {
        // Find the employee by ID
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).send({ status: 'fail', message: 'Employee not found' });
        }

        // Check if the yearOfPayment already exists
        const existingPayment = employee.paymentHistory.find(entry => entry.yearOfPayment === yearOfPayment);
        if (existingPayment) {
            return res.status(400).send({ status: 'fail', message: 'This year already exists for this person' });
        }

        // Create new payment history entry
        const newPayment = {
            yearOfPayment,
            status,
            amount,
            updatedAt: new Date()
        };

        // Push the new payment history entry to the employee's paymentHistory array
        employee.paymentHistory.push(newPayment);

        await employee.save();

        res.status(201).send({ status: 'success', message: 'Payment history created successfully', paymentHistory: newPayment });
    } catch (error) {
        res.status(500).send({ status: 'fail', message: 'Error creating payment history', error });
    }
};

// payload
// {
//     "employeeId": "66b4a67236ad3122c5b8e81e",
//     "yearOfPayment": 2025,
//     "status": "unpaid",
//     "amount": 2000
// }

// -----------------------X-X-X--------------------------------

exports.deletePaymentHistory = async (req, res) => {
    const { employeeId, yearOfPayment } = req.body;

    try {

        const employee = await Employee.findById(employeeId);
        const employeeName = employee.name
        if (!employee) {
            return res.status(404).send({ status: 'fail', message: `Employee not found - ${employeeName}` });
        }

        const paymentIndex = employee.paymentHistory.findIndex(entry => entry.yearOfPayment === yearOfPayment);
        if (paymentIndex === -1) {
            return res.status(404).send({status: 'fail', message: `Payment entry not found for this ${yearOfPayment} year of ${employeeName}`});
        }

        employee.paymentHistory.splice(paymentIndex, 1);

        await employee.save();

        res.status(200).send({ status: 'success', message: `Payment history deleted successfully - ${yearOfPayment} of ${employeeName}` });
    } catch (error) {
        res.status(500).send({ status: 'fail', message: 'Error deleting payment history', error });
    }
};


// payload
// {
//     "employeeId": "66b4a67236ad3122c5b8e81e",
//     "yearOfPayment": 2024
// }
