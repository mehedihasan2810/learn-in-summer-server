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
exports.getSingleClass = exports.deleteClass = exports.updateClass = exports.addClass = exports.getClass = exports.allClasses = void 0;
const classes_model_1 = __importDefault(require("../models/classes.model"));
const allClasses = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classes = yield classes_model_1.default.find();
        res.status(200).json(classes);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.allClasses = allClasses;
const getClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const query = { _id: id };
        const classOne = yield classes_model_1.default.findById(query);
        res.status(200).json(classOne);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getClass = getClass;
const addClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classInfo = req.body;
        const newClass = new classes_model_1.default(classInfo);
        yield newClass.save();
        res.status(201).json(newClass);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.addClass = addClass;
const updateClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const filter = { _id: id };
        const info = req.body;
        const updatedClass = yield classes_model_1.default.findByIdAndUpdate(filter, info, {
            new: true,
            upsert: false,
            rawResult: true,
        });
        res.status(200).json(updatedClass);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.updateClass = updateClass;
const deleteClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const query = { _id: id };
        const deletedClass = yield classes_model_1.default.findByIdAndDelete(query);
        res.status(200).json(deletedClass);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.deleteClass = deleteClass;
const getSingleClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const singleClass = yield classes_model_1.default.findOne({
            _id: id,
        });
        res.status(200).json(singleClass);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getSingleClass = getSingleClass;
//# sourceMappingURL=classes.controller.js.map