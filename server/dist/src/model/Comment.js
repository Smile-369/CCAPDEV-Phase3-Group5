"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    postId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Review',
    },
    restaurantId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Restaurant',
    },
    content: {
        type: String,
        required: true,
    },
});
const Comment = (0, mongoose_1.model)('Comment', commentSchema);
exports.default = Comment;
