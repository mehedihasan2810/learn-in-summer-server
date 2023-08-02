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
exports.deleteSelectedClass = exports.getSelectedClass = exports.getSelectedClassIds = exports.addSelectedClass = void 0;
const selectedClass_model_1 = __importDefault(require("../models/selectedClass.model"));
const classes_model_1 = __importDefault(require("../models/classes.model"));
const addSelectedClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, id } = req.body;
        const result = yield selectedClass_model_1.default.updateOne({ email }, { $push: { selectedClassIds: id } }, { upsert: true });
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.addSelectedClass = addSelectedClass;
const getSelectedClassIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const result = yield selectedClass_model_1.default.findOne({ email: email });
        if (!result) {
            res.status(200).json({
                email: email,
                selectedClassIds: [],
            });
        }
        else {
            res.status(200).json(result);
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getSelectedClassIds = getSelectedClassIds;
const getSelectedClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const selectedResult = yield selectedClass_model_1.default.findOne({
            email,
        });
        if (!selectedResult) {
            res.status(200).json([]);
            return;
        }
        const objectId = selectedResult === null || selectedResult === void 0 ? void 0 : selectedResult.selectedClassIds.map((id) => id);
        const result = yield classes_model_1.default.find({
            _id: {
                $in: objectId,
            },
        });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getSelectedClass = getSelectedClass;
const deleteSelectedClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const email = (_a = req.query) === null || _a === void 0 ? void 0 : _a.email;
        const id = (_b = req.query) === null || _b === void 0 ? void 0 : _b.id;
        const query = { email };
        const result = yield selectedClass_model_1.default.findOneAndUpdate(query, {
            $pull: { selectedClassIds: id },
        }, { new: true, upsert: false, rawResult: true });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.deleteSelectedClass = deleteSelectedClass;
//# sourceMappingURL=selectedClass.controller.js.map