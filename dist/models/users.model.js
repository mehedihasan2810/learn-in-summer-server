"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UsersSchema = new mongoose_1.default.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    role: { type: String, require: true },
    photoUrl: { type: String, require: true },
    date: { type: Number, require: true },
});
exports.default = mongoose_1.default.models.users || mongoose_1.default.model("Users", UsersSchema);
//# sourceMappingURL=users.model.js.map