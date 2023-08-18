"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
// External Dependencies
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const database_services_js_1 = require("./database.services.js");
// Global Config
exports.taskRouter = express_1.default.Router();
exports.taskRouter.use(express_1.default.json());
// GET
exports.taskRouter.get('/doing', async (req, res) => {
    try {
        const query = { status: 'doing' };
        const tasks = (await database_services_js_1.collections.task
            ?.find(query)
            .toArray());
        res.status(200).send(tasks);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
// GET
exports.taskRouter.get('/done', async (req, res) => {
    try {
        const query = { status: 'done' };
        const tasks = await database_services_js_1.collections.task?.aggregate([
            { $match: query },
            { $limit: 10 },
            { $sort: { date: -1 } },
        ]).toArray();
        res.status(200).send(tasks);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
// POST
exports.taskRouter.post('/', async (req, res) => {
    try {
        const newTask = {
            content: req.body.content,
            date: new Date(req.body.date),
            status: req.body.status
        };
        const result = await database_services_js_1.collections.task?.insertOne(newTask);
        result
            ? res.status(201).send(result)
            : res.status(500).send(`Failed to create a new Task.`);
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});
// PUT
exports.taskRouter.put('/:id', async (req, res) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = await database_services_js_1.collections.task?.updateOne(query, {
            $set: {
                status: req.body.status
            }
        });
        result
            ? res.status(200).send(result)
            : res.status(304).send(`Task with id: ${id} not updated`);
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});
// DELETE ALL
exports.taskRouter.delete('/', async (req, res) => {
    try {
        const result = await database_services_js_1.collections.task?.deleteMany();
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed all Tasks`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove Tasks`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`Tasks does not exist`);
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});
