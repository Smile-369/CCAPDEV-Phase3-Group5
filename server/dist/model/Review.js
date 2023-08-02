"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    restaurantId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: 'Restaurant',
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    upvote: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'User',
        },
    ],
    downvote: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'User',
        },
    ],
});
const Review = (0, mongoose_1.model)('Review', reviewSchema);
exports.default = Review;
