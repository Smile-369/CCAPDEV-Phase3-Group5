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
const review_controller_1 = require("../controller/review.controller");
const route = (0, express_1.Router)();
route.post('/new/post', ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { statusCode, message, data } = yield (0, review_controller_1.AddReview)(body);
    return res.status(statusCode).json({ message, data });
}));
route.get('/all-reviews', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { statusCode, message, data } = yield (0, review_controller_1.GetAllReviews)();
    return res.status(statusCode).json({ message, data });
}));
route.get('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { statusCode, message, data } = yield (0, review_controller_1.GetReviews)();
    return res.status(statusCode).json({ message, data });
}));
route.get('/review/postId/:postId', ({ params }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = params;
    const { statusCode, data, message } = yield (0, review_controller_1.FindReviewById)(postId);
    return res.status(statusCode).json({ message, data });
}));
route.put('/review/edit/postId/:postId', ({ params, body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = params;
    const { statusCode, data, message } = yield (0, review_controller_1.FindReviewByIdAndEdit)(postId, body);
    return res.status(statusCode).json({ message, data });
}));
route.delete('/reviews/delete/postId/:postId', ({ params }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = params;
    const { statusCode, message } = yield (0, review_controller_1.FindReviewByIdAndDelete)(postId);
    return res.status(statusCode).json({ message });
}));
route.put('/review/like', ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, userId } = body;
    const { statusCode, message } = yield (0, review_controller_1.LikeReview)(postId, userId);
    return res.status(statusCode).json({ message });
}));
route.put('/review/dislike', ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, userId } = body;
    const { statusCode, message } = yield (0, review_controller_1.DislikeReview)(postId, userId);
    return res.status(statusCode).json({ message });
}));
exports.default = route;
