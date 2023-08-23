"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PaymentsSchema = new mongoose_1.default.Schema({
    class_name: { type: String, require: true },
    instructor_name: { type: String, require: true },
    student_name: { type: String, require: true },
    student_email: { type: String, require: true },
    instructor_email: { type: String, require: true },
    transactionId: { type: String, require: true },
    price: { type: Number, require: true },
    classId: { type: String, require: true },
    status: { type: String, require: true },
    date: { type: Number, require: true },
});
exports.default = mongoose_1.default.models.payments ||
    mongoose_1.default.model("Payments", PaymentsSchema);
//# sourceMappingURL=payments.model.js.map