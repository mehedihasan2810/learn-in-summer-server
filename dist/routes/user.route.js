"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.post("/addUser", user_controller_1.addUser);
userRouter.get("/getUsers", user_controller_1.getUsers);
userRouter.get("/getUser", user_controller_1.getUser);
userRouter.put("/updateUserRole/:id", user_controller_1.updateUserRole);
//# sourceMappingURL=user.route.js.map