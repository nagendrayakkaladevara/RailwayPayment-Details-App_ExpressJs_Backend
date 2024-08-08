const Employee = require('../models/employee');

exports.getTotalDetails = async (req, res) => {
    try {
        const totalData = await Employee.find();
        res.status(200).send(totalData);
    } catch (error) {
        res.status(500).send({ msg: 'Error fetching data', error });
    }
};