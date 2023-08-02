"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SelectedClassesSchema = new mongoose_1.default.Schema({
    email: { type: String, require: true },
    selectedClass: [String],
});
exports.default = mongoose_1.default.models.selectedClasses ||
    mongoose_1.default.model("selectedClasses", SelectedClassesSchema);
//# sourceMappingURL=selectedClass.model.js.map