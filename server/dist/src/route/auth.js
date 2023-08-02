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
const authentication_controller_1 = require("../controller/authentication.controller");
const multer_1 = require("../middleware/multer");
const route = (0, express_1.Router)();
route.get('/user/userId/:userId', ({ params }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = params;
    const { statusCode, message, data } = yield (0, authentication_controller_1.FindById)(userId);
    return res.status(statusCode).json({ message, data });
}));
route.get('/refresh', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = req.cookies;
    if (!cookie.id)
        return res.status(401).send();
    const id = cookie.id;
    const { statusCode, message, data } = yield (0, authentication_controller_1.FindById)(id);
    return res.status(statusCode).json({ message, data });
}));
route.get('/validate/email/:email', ({ params }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = params;
    const { statusCode, message, data } = yield (0, authentication_controller_1.CheckEmail)(email);
    return res.status(statusCode).json({
        message,
        data,
    });
}));
route.get('/validate/username/:username', ({ params }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = params;
    const { statusCode, message, data } = yield (0, authentication_controller_1.CheckUsername)(username);
    return res.status(statusCode).json({
        message,
        data,
    });
}));
route.post('/register', ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { statusCode, message, data } = yield (0, authentication_controller_1.RegisterAccount)(body);
    return res.status(statusCode).json({ message, data });
}));
route.get('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.query;
    const { statusCode, message, data } = yield (0, authentication_controller_1.LoginAccount)({
        username: username,
        password: password,
    });
    if (data === null || data === void 0 ? void 0 : data._id) {
        const store = data._id.toString();
        res.cookie('id', store, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
    }
    return res.status(statusCode).json({ message, data });
}));
route.get('/profile/username/:username', ({ params }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = params;
    const { statusCode, message, data } = yield (0, authentication_controller_1.FindByUsername)(username);
    return res.status(statusCode).json({ message, data });
}));
route.put('/edit-profile/id/:id', multer_1.upload.single('profile'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, bio } = req.body;
    const { id } = req.params;
    const imageBuffer = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
    const { statusCode, message, data } = yield (0, authentication_controller_1.EditAccount)({
        name,
        bio,
        profile: imageBuffer,
        id,
    });
    return res.status(statusCode).json({ message, data });
}));
exports.default = route;
