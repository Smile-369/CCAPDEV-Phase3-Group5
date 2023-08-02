"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const route_1 = __importDefault(require("./route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const credentials_1 = require("./middleware/credentials");
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
// const password = process.env.PASS || '66DCvZz6UCDhHbpX';
const password = process.env.PASS || 'ndjWNB0MFif5QNXY';
// const uri = `mongodb+srv://user:${password}@restaurant.ot5v5rm.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://Restaurant:ndjWNB0MFif5QNXY@cluster0.ibpuctm.mongodb.net/?retryWrites=true&w=majority`;
//Connects the server to the database
mongoose_1.default.connect(uri);
const db = mongoose_1.default.connection;
db.on('connected', () => {
    console.log('⚡️[database]: Mongoose is connected');
});
//Middlewares: handle the initialization of server to shorten our codes and make it secure and simple at the same time
app.use(express_1.default.urlencoded({ extended: true }));
app.use(credentials_1.credentials);
app.use((0, cors_1.default)({ origin: credentials_1.allowedOrigins }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//this shows up when we visit the http://localhost:8080/
app.get('/', (req, res) => {
    res.send('This is restaurant API!');
});
//Handles all the route / api requests.
//Our app uses REST. this handles the communications between the server and the client side.
app.use('/api', route_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
exports.default = app;
