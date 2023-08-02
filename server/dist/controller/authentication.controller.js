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
exports.FindByUsername = exports.FindById = exports.GetAllAccounts = exports.EditAccount = exports.CheckUsername = exports.CheckEmail = exports.LoginAccount = exports.RegisterAccount = void 0;
const User_1 = __importDefault(require("../model/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const RegisterAccount = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.password) {
        return {
            statusCode: 400,
            message: 'Password is required',
        };
    }
    try {
        const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
        const user = new User_1.default(Object.assign(Object.assign({}, data), { password: hashedPassword }));
        const savedUser = yield user.save();
        return {
            statusCode: 201,
            message: 'Account successfully registered',
            data: savedUser,
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error registering the account',
        };
    }
});
exports.RegisterAccount = RegisterAccount;
const LoginAccount = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ username: data.username }, { username: 1, password: 1, name: 1, profile: 1, isOwner: 1, meta: 1 });
        if (!user) {
            return {
                statusCode: 404,
                message: 'User not found',
            };
        }
        const isMatch = yield bcrypt_1.default.compare(data.password, user.password);
        if (!isMatch) {
            return { statusCode: 404, message: 'Invalid password' };
        }
        return { statusCode: 200, data: user };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error registering the account',
        };
    }
});
exports.LoginAccount = LoginAccount;
const CheckEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({ email }, { email: 1, _id: 0 });
        const isTaken = users.length > 0;
        return {
            statusCode: 200,
            data: isTaken,
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error retrieving usernames',
        };
    }
});
exports.CheckEmail = CheckEmail;
const CheckUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({ username }, { username: 1, _id: 0 });
        const isTaken = users.length > 0;
        return {
            statusCode: 200,
            data: isTaken,
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error retrieving usernames',
        };
    }
});
exports.CheckUsername = CheckUsername;
const EditAccount = ({ id, bio, name, profile, }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(id);
    try {
        if (!user) {
            return {
                statusCode: 404,
                message: 'An error occurred',
            };
        }
        if (profile) {
            user.profile = profile;
        }
        if (bio) {
            user.bio = bio;
        }
        if (name) {
            user.name = name;
        }
        yield user.save();
        return {
            statusCode: 200,
            message: 'Success',
        };
    }
    catch (err) {
        return { statusCode: 500, message: 'An error occurred' };
    }
});
exports.EditAccount = EditAccount;
const GetAllAccounts = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find({});
    return {
        statusCode: 200,
        message: 'Accounts',
        data: users,
    };
});
exports.GetAllAccounts = GetAllAccounts;
const FindById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(id);
        if (!user) {
            return { statusCode: 404, message: 'User not found' };
        }
        return {
            statusCode: 200,
            data: user,
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error retrieving usernames',
        };
    }
});
exports.FindById = FindById;
const FindByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ username });
        if (!user) {
            return { statusCode: 404, message: 'User not found' };
        }
        return {
            statusCode: 200,
            data: user,
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            message: 'Error retrieving usernames',
        };
    }
});
exports.FindByUsername = FindByUsername;
