"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = process.env.MONGODB_URI;
let db;
const connectToDatabase = async () => {
    if (!db) {
        const client = new mongodb_1.MongoClient(url);
        await client.connect();
        db = client.db();
        console.log('Connected to MongoDB');
    }
    return db;
};
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=db.js.map