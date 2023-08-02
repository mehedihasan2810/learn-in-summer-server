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
exports.getUser = exports.getUsers = exports.addUser = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.body;
        if (!userInfo.email || !userInfo.name) {
            return;
        }
        const getUser = yield users_model_1.default.findOne({ email: userInfo.email });
        const ids = [];
        const getUsers = yield users_model_1.default.find();
        getUsers.reduce((acc, user) => {
            if (!acc.includes(user.email)) {
                acc.push(user.email);
                ids.push(user._id);
            }
            return acc;
        }, []);
        yield users_model_1.default.deleteMany({
            _id: { $nin: ids.map((id) => id) },
        });
        if (!getUser) {
            const result = new users_model_1.default(userInfo);
            yield result.save();
            res.status(201).json(result);
        }
        else {
            res.status(200).json({ message: "user exist" });
        }
        // res.status(200).json({ getUser });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.addUser = addUser;
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getUsers = yield users_model_1.default.find();
        res.status(200).json(getUsers);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        if (!email) {
            res.status(401).json({ success: false });
            return;
        }
        const getUser = yield users_model_1.default.findOne({ email: email });
        if (!getUser) {
            res.status(401).json({ success: false });
        }
        else {
            res.status(200).json(getUser);
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});
exports.getUser = getUser;
//# sourceMappingURL=user.controller.js.map