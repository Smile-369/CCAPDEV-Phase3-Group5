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
exports.DislikeReview = exports.LikeReview = exports.FindReviewByIdAndDelete = exports.FindReviewByIdAndEdit = exports.FindReviewById = exports.GetReviews = exports.GetAllReviews = exports.AddReview = void 0;
const Restaurant_1 = __importDefault(require("../model/Restaurant"));
const Review_1 = __importDefault(require("../model/Review"));
const User_1 = __importDefault(require("../model/User"));
// Function to add a new review
const AddReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newReview = new Review_1.default(data);
        const savedReview = yield newReview.save();
        const restaurant = yield Restaurant_1.default.findById(savedReview.restaurantId);
        if (!restaurant) {
            return {
                statusCode: 404,
                message: 'restaurant not found',
            };
        }
        restaurant.updateRatings(savedReview.rating);
        return {
            statusCode: 201,
            message: 'Review successfully added',
            data: savedReview,
        };
    }
    catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            message: 'Error adding the review',
        };
    }
});
exports.AddReview = AddReview;
const GetAllReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield Review_1.default.find({});
        return {
            statusCode: 200,
            data: reviews,
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error loading reviews',
        };
    }
});
exports.GetAllReviews = GetAllReviews;
const GetReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield Review_1.default.find({}).sort({ upvote: -1 }).limit(5).exec();
        return {
            statusCode: 200,
            data: reviews,
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error loading reviews',
        };
    }
});
exports.GetReviews = GetReviews;
const FindReviewById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield Review_1.default.findById(id);
        if (!review) {
            return {
                statusCode: 404,
                message: 'Review not found',
            };
        }
        return {
            statusCode: 200,
            data: review,
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error looking for a review',
        };
    }
});
exports.FindReviewById = FindReviewById;
const FindReviewByIdAndEdit = (id, { title, content }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield Review_1.default.findById(id);
        if (!review)
            return { statusCode: 404, message: 'Not Found' };
        if (title)
            review.title = title;
        if (content)
            review.content = content;
        yield review.save();
        return {
            statusCode: 200,
            message: 'Edit successful',
            data: review,
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error looking for a review',
        };
    }
});
exports.FindReviewByIdAndEdit = FindReviewByIdAndEdit;
const FindReviewByIdAndDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Review_1.default.findByIdAndDelete(id);
        return {
            statusCode: 200,
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error looking for a review',
        };
    }
});
exports.FindReviewByIdAndDelete = FindReviewByIdAndDelete;
const LikeReview = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield Review_1.default.findById(postId);
        const user = yield User_1.default.findById(userId);
        if (!review || !user) {
            return {
                statusCode: 404,
                message: 'Something went wrong',
            };
        }
        if (review.upvote.includes(user._id) &&
            user.meta.likes.includes(review._id)) {
            review.upvote = review.upvote.filter((id) => {
                id !== user._id;
            });
            user.meta.likes = user.meta.likes.filter((id) => {
                id !== review._id;
            });
        }
        else {
            review.upvote.push(user._id);
            user.meta.likes.push(review._id);
        }
        if (review.downvote.includes(user._id) &&
            user.meta.dislikes.includes(review._id)) {
            review.downvote = review.downvote.filter((id) => {
                id !== user._id;
            });
            user.meta.dislikes = user.meta.dislikes.filter((id) => {
                id !== review._id;
            });
        }
        yield review.save();
        yield user.save();
        return {
            statusCode: 200,
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error looking for a review',
        };
    }
});
exports.LikeReview = LikeReview;
const DislikeReview = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield Review_1.default.findById(postId);
        const user = yield User_1.default.findById(userId);
        if (!review || !user) {
            return {
                statusCode: 404,
                message: 'Something went wrong',
            };
        }
        if (review.downvote.includes(user._id) &&
            user.meta.dislikes.includes(review._id)) {
            review.downvote = review.downvote.filter((id) => {
                id !== user._id;
            });
            user.meta.dislikes = user.meta.dislikes.filter((id) => {
                id !== review._id;
            });
        }
        else {
            review.downvote.push(user._id);
            user.meta.dislikes.push(review._id);
        }
        if (review.upvote.includes(user._id) &&
            user.meta.likes.includes(review._id)) {
            review.upvote = review.upvote.filter((id) => {
                id !== user._id;
            });
            user.meta.likes = user.meta.likes.filter((id) => {
                id !== review._id;
            });
        }
        yield review.save();
        yield user.save();
        yield review.save();
        yield user.save();
        return {
            statusCode: 200,
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error looking for a review',
        };
    }
});
exports.DislikeReview = DislikeReview;
