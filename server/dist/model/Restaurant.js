"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const restaurantSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    userId: {
        type: mongoose_1.Types.ObjectId,
    },
    profile: {
        type: Buffer,
        required: true,
    },
    ratings: {
        type: Number,
        default: 0,
        required: true,
    },
    totalVotes: {
        type: Number,
        default: 0,
    },
});
restaurantSchema.methods.updateRatings = function (newVote) {
    if (newVote >= 0 && newVote <= 5) {
        const newTotalVotes = this.totalVotes + 1;
        const newTotalRatings = this.ratings * this.totalVotes + newVote;
        this.totalVotes = newTotalVotes;
        this.ratings = newTotalRatings / newTotalVotes;
        return this.save();
    }
    else {
        throw new Error('Invalid vote value. Vote must be between 0 and 5.');
    }
};
const Restaurant = (0, mongoose_1.model)('Restaurant', restaurantSchema);
exports.default = Restaurant;
