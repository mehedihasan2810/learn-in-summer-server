"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ClassesSchema = new mongoose_1.default.Schema({
    class_name: { type: String, require: true },
    title: { type: String, require: true },
    instructor_name: { type: String, require: true },
    email: { type: String, require: true },
    available_seats: { type: Number, require: true },
    price: { type: Number, require: true },
    duration: { type: String, require: true },
    image: { type: String, require: true },
    enrolled: { type: Number, require: true },
    feedback: { type: String, require: true },
    date: { type: String, require: true },
    status: { type: String, require: true },
});
exports.default = mongoose_1.default.models.classes ||
    mongoose_1.default.model("Classes", ClassesSchema);
//# sourceMappingURL=classes.model.js.map