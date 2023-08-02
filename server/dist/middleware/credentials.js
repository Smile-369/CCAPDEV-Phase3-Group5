"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentials = exports.allowedOrigins = void 0;
exports.allowedOrigins = [
    'http://localhost:3000',
    'https://restaurantchecker.vercel.app',
];
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (exports.allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', 'true');
    }
    next();
};
exports.credentials = credentials;
