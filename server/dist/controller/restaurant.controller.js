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
exports.FindRestaurantById = exports.FindRestaurantByName = exports.FindMyRestaurant = exports.EditRestaurant = exports.NewRestaurant = exports.GetAllRestaurant = exports.CheckRestaurantName = void 0;
const Comment_1 = __importDefault(require("../model/Comment"));
const Restaurant_1 = __importDefault(require("../model/Restaurant"));
const User_1 = __importDefault(require("../model/User"));
const CheckRestaurantName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield Restaurant_1.default.find({ name }, { name: 1, _id: 0 });
        const isTaken = restaurant.length > 0;
        return {
            statusCode: 200,
            data: isTaken,
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error looking for restaurant',
        };
    }
});
exports.CheckRestaurantName = CheckRestaurantName;
const GetAllRestaurant = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield Restaurant_1.default.find({});
        return {
            statusCode: 200,
            data: restaurant,
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error looking for restaurant',
        };
    }
});
exports.GetAllRestaurant = GetAllRestaurant;
const NewRestaurant = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = new Restaurant_1.default(data);
        const owner = yield User_1.default.findById(data.userId);
        if (!owner) {
            return { statusCode: 404, message: 'user not found' };
        }
        const savedRestaurant = yield restaurant.save();
        owner.isOwner = true;
        yield owner.save();
        return {
            statusCode: 201,
            message: 'Resetaurant successfully registered',
            data: savedRestaurant,
        };
    }
    catch (err) {
        // console.log(err);
        return {
            statusCode: 500,
            message: 'Error registering the restaurant',
        };
    }
});
exports.NewRestaurant = NewRestaurant;
const EditRestaurant = ({ id, bio, name, profile, }) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield Restaurant_1.default.findById(id);
    try {
        if (!restaurant) {
            return {
                statusCode: 404,
                message: 'Restaurant not found',
            };
        }
        if (profile) {
            restaurant.profile = profile;
        }
        if (bio) {
            restaurant.bio = bio;
        }
        if (name) {
            restaurant.name = name;
        }
        yield restaurant.save();
        return {
            statusCode: 200,
            message: 'Success',
        };
    }
    catch (err) {
        return { statusCode: 500, message: 'An error occurred' };
    }
});
exports.EditRestaurant = EditRestaurant;
const FindMyRestaurant = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield Restaurant_1.default.findOne({ userId });
        return {
            statusCode: 200,
            data: restaurant,
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error looking for a restaurant',
        };
    }
});
exports.FindMyRestaurant = FindMyRestaurant;
const FindRestaurantByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield Restaurant_1.default.findOne({ name: name });
        return {
            statusCode: 200,
            data: restaurant,
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error looking for a restaurant',
        };
    }
});
exports.FindRestaurantByName = FindRestaurantByName;
const FindRestaurantById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield Restaurant_1.default.findById(id, { name: 1, userId: 1 });
        if (!restaurant)
            return {
                statusCode: 404,
                message: 'Restaurant not found',
            };
        const comments = yield Comment_1.default.find({ restaurantId: restaurant._id });
        const data = Object.assign(Object.assign({}, restaurant), { comments });
        return {
            statusCode: 200,
            data: data,
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error looking for a restaurant',
        };
    }
});
exports.FindRestaurantById = FindRestaurantById;
