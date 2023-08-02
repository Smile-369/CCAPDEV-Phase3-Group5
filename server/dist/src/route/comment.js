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
const express_1 = require("express");
const response_controller_1 = require("../controller/response.controller");
const route = (0, express_1.Router)();
route.post('/comment', ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { statusCode, message, data } = yield (0, response_controller_1.AddComment)(body);
    return res.status(statusCode).json({ message, data });
}));
route.get('/comments', ({ query }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantId } = query;
    const { statusCode, message, data } = yield (0, response_controller_1.GetComments)(restaurantId);
    return res.status(statusCode).json({ message, data });
}));
exports.default = route;
