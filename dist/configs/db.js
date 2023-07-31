"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const dbURL = config_1.default.db.url;
mongoose_1.default
    .connect(dbURL)
    .then(() => {
    console.log("mongodb atlas is connected");
})
    .catch((err) => {
    console.log(err);
    process.exit(1);
});
//# sourceMappingURL=db.js.map