"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
    },
    bio: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profile: { type: Buffer },
    isOwner: { type: Boolean, default: false },
    meta: {
        likes: [
            {
                type: mongoose_1.Types.ObjectId,
                ref: 'Review',
            },
        ],
        dislikes: [
            {
                type: mongoose_1.Types.ObjectId,
                ref: 'Review',
            },
        ],
    },
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
