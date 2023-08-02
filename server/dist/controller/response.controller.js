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
exports.GetComments = exports.AddComment = void 0;
const Comment_1 = __importDefault(require("../model/Comment"));
const AddComment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = new Comment_1.default(data);
        const savedComment = yield comment.save();
        return {
            statusCode: 201,
            data: savedComment,
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error adding comment',
        };
    }
});
exports.AddComment = AddComment;
const GetComments = (restaurantId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield Comment_1.default.find({ restaurantId });
        return {
            statusCode: 201,
            data: comments,
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error retrieving comments',
        };
    }
});
exports.GetComments = GetComments;
