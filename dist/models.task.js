"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Class Implementation
class Task {
    constructor(content, status, date, _id) {
        this.content = content;
        this.status = status;
        this.date = date;
        this._id = _id;
    }
}
exports.default = Task;
