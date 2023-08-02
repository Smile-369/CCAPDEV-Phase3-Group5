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
const multer_1 = require("../middleware/multer");
const restaurant_controller_1 = require("../controller/restaurant.controller");
const route = (0, express_1.Router)();
route.put('/edit-restaurant/id/:id', multer_1.upload.single('profile'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, bio } = req.body;
    const { id } = req.params;
    const imageBuffer = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
    const { statusCode, message, data } = yield (0, restaurant_controller_1.EditRestaurant)({
        name,
        bio,
        profile: imageBuffer,
        id,
    });
    return res.status(statusCode).json({ message, data });
}));
route.post('/restaurant/register', multer_1.upload.single('profile'), ({ body, file }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = file === null || file === void 0 ? void 0 : file.buffer;
    const { statusCode, message, data } = yield (0, restaurant_controller_1.NewRestaurant)(Object.assign({ profile }, body));
    return res.status(statusCode).json({ message, data });
}));
route.get('/all-restaurants', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { statusCode, message, data } = yield (0, restaurant_controller_1.GetAllRestaurant)();
    return res.status(statusCode).json({
        message,
        data,
    });
}));
route.get('/restaurant/validate/name/:name', ({ params }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = params;
    const { statusCode, message, data } = yield (0, restaurant_controller_1.CheckRestaurantName)(name);
    return res.status(statusCode).json({
        message,
        data,
    });
}));
route.get('/restaurant/userId/:userId', ({ params }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = params;
    const { statusCode, message, data } = yield (0, restaurant_controller_1.FindMyRestaurant)(userId);
    return res.status(statusCode).json({ message, data });
}));
route.get('/restaurant/restaurantId/:restaurantId', ({ params }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantId } = params;
    const { statusCode, message, data } = yield (0, restaurant_controller_1.FindRestaurantById)(restaurantId);
    return res.status(statusCode).json({ message, data });
}));
route.get('/restaurants/name/:name', ({ params }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = params;
    const { statusCode, message, data } = yield (0, restaurant_controller_1.FindRestaurantByName)(name);
    return res.status(statusCode).json({ message, data });
}));
exports.default = route;
