"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizedToken = void 0;
const authentication_controller_1 = require("../controller/authentication.controller");
const authorizedToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const idHeader = req.headers['authorization'];
    if (!idHeader)
        return res.status(401).json({
            message: 'Missing authorization header',
        });
    const id = idHeader.split(' ')[1];
    if (!id)
        return res.status(401).json({
            message: 'Missing access token',
        });
    try {
        const { data } = yield (0, authentication_controller_1.FindById)(id);
        if (data) {
            next();
        }
        else
            res.status(401).json({
                message: 'Invalid access token',
            });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});
exports.authorizedToken = authorizedToken;
