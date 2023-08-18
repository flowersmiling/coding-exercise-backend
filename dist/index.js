"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_services_js_1 = require("./database.services.js");
const routes_task_js_1 = require("./routes.task.js");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8000;
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};
(0, database_services_js_1.connectToDatabase)();
app.use((0, cors_1.default)(corsOptions));
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.use('/tasks', routes_task_js_1.taskRouter);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
