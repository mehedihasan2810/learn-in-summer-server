"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dev = {
    app: {
        port: process.env.PORT || 4000,
    },
    db: {
        url: process.env.DB_URL || "mongodb://localhost:27017/userDemoDB",
    },
};
exports.default = dev;
//# sourceMappingURL=config.js.map