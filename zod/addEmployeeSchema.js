const { z } = require('zod');

const addEmployeeSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    department: z.string().min(1, { message: "Department is required" }),
    yearOfJoining: z.number().min(1900, { message: "Invalid year of joining" }).max(new Date().getFullYear(), { message: "Year of joining cannot be in the future" }).optional(),
});

module.exports = addEmployeeSchema;
