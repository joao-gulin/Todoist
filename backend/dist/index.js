"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
const taskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title for the task is required'),
    description: zod_1.z.string().min(1, 'Description for the task is required'),
});
// Get for all the data in the Api
app.get('/task', async (req, res) => {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
});
// Post for creating a new task with zod validation
app.post('/task', async (req, res) => {
    try {
        taskSchema.parse(req.body); // Validate request body
        const { title, description } = req.body;
        const newTask = await prisma.task.create({
            data: { title, description },
        });
        res.status(201).json(newTask);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json(error.errors);
        }
        else {
            res.status(500).json({ error: 'Failed to create user' });
        }
    }
});
// Delete for deleting a task
app.delete('/task/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Attempt to delete the task with the given ID
        const deletedTask = await prisma.task.delete({
            where: { id: Number(id) },
        });
        // If the task was not found, respond with a 404 status
        if (!deletedTask) {
            res.status(404).json({ message: 'Task not found' });
        }
        // Respond with the deleted task data
        res.json(deletedTask);
    }
    catch (error) {
        // Handle any errors that occur during the delete operation
        res.status(500).json({ error: 'Failed to delete task' });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map