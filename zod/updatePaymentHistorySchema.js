const { z } = require('zod');

const updatePaymentHistorySchema = z.array(
    z.object({
        employeeId: z.string().min(1, { message: "Employee ID is required" }),
        yearOfPayment: z.number().min(1900, { message: "Year of payment must be a valid year" }).max(new Date().getFullYear(), { message: "Year of payment cannot be in the future" }),
        status: z.enum(["paid", "unpaid"], { message: "Status must be either 'paid' or 'unpaid'" }),
        amount: z.number().min(0, { message: "Amount must be a non-negative number" }),
    })
);

module.exports = updatePaymentHistorySchema;
