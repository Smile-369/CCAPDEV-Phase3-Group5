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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_controller_1 = require("../controller/authentication.controller");
const auth_1 = __importDefault(require("./auth"));
const restaurant_1 = __importDefault(require("./restaurant"));
const reviews_1 = __importDefault(require("./reviews"));
const comment_1 = __importDefault(require("./comment"));
const route = (0, express_1.Router)();
route.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield (0, authentication_controller_1.GetAllAccounts)();
    return res.send(data);
}));
route.use('/', auth_1.default); //Routes for authentication
route.use('/', restaurant_1.default); //Routes for restaurant
route.use('/', reviews_1.default); //Routes for reviews
route.use('/', comment_1.default); //Routes for comments
exports.default = route;
