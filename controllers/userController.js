const Employee = require('../models/employee');

// exports.getTotalDetails = async (req, res) => {
//     try {
//         const totalData = await Employee.find();
//         res.status(200).send(totalData);
//     } catch (error) {
//         res.status(500).send({ msg: 'Error fetching data', error });
//     }
// };


exports.getTotalDetails = async (req, res) => {
    try {
        const totalData = await Employee.find();

        // Map through each employee to format the data
        const formattedData = totalData.map(employee => ({
            _id: employee._id,
            name: employee.name,
            empId: employee.empId,
            email: employee.email,
            department: employee.department,
            yearOfJoining: employee.yearOfJoining,
         
            paymentHistory: employee.paymentHistory.map(({ yearOfPayment, status, amount, updatedAt }) => ({
                yearOfPayment,
                status,
                amount,
                updatedAt
            }))
        }));

        res.status(200).send(formattedData);
    } catch (error) {
        res.status(500).send({ msg: 'Error fetching data', error });
    }
};
