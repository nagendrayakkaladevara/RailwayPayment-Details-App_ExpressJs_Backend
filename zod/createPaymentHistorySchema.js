const { z } = require('zod');

const createPaymentHistorySchema = z.object({
    employeeId: z.string().min(1, { message: "Employee ID is required" }),
    yearOfPayment: z.number().min(1900, { message: "Year of payment must be a valid year" }).max(new Date().getFullYear() + 1, { message: "Year of payment cannot be in the future" }),
    status: z.enum(["paid", "unpaid"], { message: "Status must be either 'paid' or 'unpaid'" }),
    amount: z.number().optional(),
}).refine(data => data.status === 'unpaid' || (data.status === 'paid' && data.amount !== undefined), {
    message: "Amount is required when status is 'paid'",
    path: ['amount'],
});

module.exports = { createPaymentHistorySchema };
