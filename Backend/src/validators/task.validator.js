// src/validators/task.validator.js
const { z } = require("zod");

const objectIdRegex = /^[a-f\d]{24}$/i;

const createGroupTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(200).trim(),
  description: z.string().max(2000).default(""),
  assignedTo: z
    .string()
    .regex(objectIdRegex, "Invalid user ID")
    .optional()
    .nullable(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
  dueDate: z.coerce.date().optional().nullable(),
});

const updateGroupTaskSchema = z
  .object({
    title: z.string().min(1).max(200).trim().optional(),
    description: z.string().max(2000).optional(),
    assignedTo: z
      .string()
      .regex(objectIdRegex, "Invalid user ID")
      .optional()
      .nullable(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    dueDate: z.coerce.date().optional().nullable(),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
  })
  .strict(); // reject unknown fields

const createPersonalTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(200).trim(),
  description: z.string().max(2000).default(""),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
  dueDate: z.coerce.date().optional().nullable(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).default("TODO"),
});

const updatePersonalTaskSchema = z
  .object({
    title: z.string().min(1).max(200).trim().optional(),
    description: z.string().max(2000).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    dueDate: z.coerce.date().optional().nullable(),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
  })
  .strict();

module.exports = {
  createGroupTaskSchema,
  updateGroupTaskSchema,
  createPersonalTaskSchema,
  updatePersonalTaskSchema,
};
