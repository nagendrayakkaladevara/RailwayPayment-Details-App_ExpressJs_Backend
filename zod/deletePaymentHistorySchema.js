const { z } = require('zod');

const deletePaymentHistorySchema = z.object({
    employeeId: z.string().min(1, { message: "Employee ID is required" }),
    yearOfPayment: z.number().min(1900, { message: "Year of payment must be a valid year" }).max(new Date().getFullYear(), { message: "Year of payment cannot be in the future" }),
});

module.exports = { deletePaymentHistorySchema };