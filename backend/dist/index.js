"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.get('/task', async (req, res) => {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
});
app.post('/task', async (req, res) => {
    const { title, description } = req.body;
    const task = await prisma.task.create({
        data: { title, description },
    });
    res.json(task);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map