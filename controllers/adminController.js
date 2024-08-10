const { z } = require('zod');
const Employee = require('../models/employee');
const addEmployeeSchema = require('../zod/addEmployeeSchema');
const updatePaymentHistorySchema = require('../zod/updatePaymentHistorySchema');

exports.updatePaymentHistory = async (req, res) => {
    const updates = req.body;

    try {

        updatePaymentHistorySchema.parse(updates);

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

            paymentEntry.status = status;
            paymentEntry.amount = amount;
            paymentEntry.updatedAt = new Date();

            await employee.save();
            return { status: 'success', message: `Updated payment history for employee ${employeeName} - ${employeeId} for year ${yearOfPayment}` };
        });

        const results = await Promise.all(updatePromises);

        res.status(200).send(results);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).send({ status: 'fail', message: 'Validation error', errors: error.errors });
        }
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

        createPaymentHistorySchema.parse(req.body);

        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).send({ status: 'fail', message: 'Employee not found' });
        }

        // Check if the yearOfPayment already exists
        const existingPayment = employee.paymentHistory.find(entry => entry.yearOfPayment === yearOfPayment);
        if (existingPayment) {
            return res.status(400).send({ status: 'fail', message: 'This year already exists for this person' });
        }

        const newPayment = {
            yearOfPayment,
            status,
            amount,
            updatedAt: new Date(),
        };

        employee.paymentHistory.push(newPayment);

        await employee.save();

        res.status(201).send({ status: 'success', message: 'Payment history created successfully', paymentHistory: newPayment });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).send({ status: 'fail', message: 'Validation error', errors: error.errors });
        }
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

        deletePaymentHistorySchema.parse(req.body);

        // Find the employee by ID
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).send({ status: 'fail', message: `Employee not found` });
        }

        const employeeName = employee.name;

        const paymentIndex = employee.paymentHistory.findIndex(entry => entry.yearOfPayment === yearOfPayment);
        if (paymentIndex === -1) {
            return res.status(404).send({ status: 'fail', message: `Payment entry not found for year ${yearOfPayment} of ${employeeName}` });
        }

        employee.paymentHistory.splice(paymentIndex, 1);

        await employee.save();

        res.status(200).send({ status: 'success', message: `Payment history deleted successfully for year ${yearOfPayment} of ${employeeName}` });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).send({ status: 'fail', message: 'Validation error', errors: error.errors });
        }
        res.status(500).send({ status: 'fail', message: 'Error deleting payment history', error });
    }
};

// payload
// {
//     "employeeId": "66b4a67236ad3122c5b8e81e",
//     "yearOfPayment": 2024
// }

// -----------------------X-X-X--------------------------------

exports.addEmployee = async (req, res) => {
    const { name, email, department, yearOfJoining } = req.body;

    try {

        addEmployeeSchema.parse(req.body);

        const newEmployee = new Employee({
            name,
            email,
            department,
            yearOfJoining,
            paymentHistory: [],
        });

        await newEmployee.save();

        res.status(201).send({ status: 'success', message: 'Employee added successfully! Now you can add paymentHistory.', employee: newEmployee });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).send({ status: 'fail', message: 'Validation error', errors: error.errors });
        }
        res.status(500).send({ status: 'fail', message: 'Error adding employee', error });
    }
};

// payload
// {
//     "name": "Yakkaladevara Sai Nagendra",
//     "email": "sai.nagendra@example.com",
//     "department": "Engineering",
//     "yearOfJoining": 2022
// }

// -----------------------X-X-X--------------------------------

exports.getTotalAmountByYear = async (req, res) => {
    try {

        const employees = await Employee.find();

        const totalAmounts = {};

        employees.forEach(employee => {
            employee.paymentHistory.forEach(payment => {
                const year = payment.yearOfPayment;
                const amount = payment.amount;

                if (!totalAmounts[year]) {
                    totalAmounts[year] = 0;
                }

                totalAmounts[year] += amount;
            });
        });

        res.status(200).send(totalAmounts);
    } catch (error) {
        res.status(500).send({ status: 'fail', message: 'Error fetching total amounts', error });
    }
};

// -----------------------X-X-X--------------------------------

exports.getCountByDepartment = async (req, res) => {
    try {

        const employees = await Employee.find();

        const departmentCounts = {};

        employees.forEach(employee => {
            const department = employee.department || "Unassigned";

            if (!departmentCounts[department]) {
                departmentCounts[department] = 0;
            }

            departmentCounts[department] += 1;
        });

        res.status(200).send(departmentCounts);
    } catch (error) {
        res.status(500).send({ status: 'fail', message: 'Error fetching employee counts by department', error });
    }
};

// -----------------------X-X-X--------------------------------

// exports.getTotalAmountByDepartment = async (req, res) => {
//     const { year } = req.params;

//     try {

//         const employees = await Employee.find();

//         const departmentAmounts = {};

//         employees.forEach(employee => {
//             const department = employee.department || "Unassigned";

//             employee.paymentHistory.forEach(payment => {
//                 if (payment.yearOfPayment === year) {

//                     if (!departmentAmounts[department]) {
//                         departmentAmounts[department] = 0;
//                     }

//                     departmentAmounts[department] += payment.amount;
//                 }
//             });
//         });

//         res.status(200).send(departmentAmounts);
//     } catch (error) {
//         res.status(500).send({ msg: 'Error fetching total amounts by department', error });
//     }
// };

exports.getTotalPaidAmountByDepartment = async (req, res) => {
    try {
        const employees = await Employee.find();

        const departmentAmounts = {};

        employees.forEach(employee => {
            const department = employee.department || "Unassigned";

            employee.paymentHistory.forEach(payment => {
                if (payment.status === 'paid') {

                    if (!departmentAmounts[department]) {
                        departmentAmounts[department] = 0;
                    }

                    departmentAmounts[department] += payment.amount;
                }
            });
        });

        res.status(200).send(departmentAmounts);
    } catch (error) {
        res.status(500).send({ status: 'fail', message: 'Error fetching total paid amounts by department', error });
    }
};