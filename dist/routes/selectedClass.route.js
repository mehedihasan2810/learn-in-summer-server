"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectedClassRouter = void 0;
const express_1 = __importDefault(require("express"));
const selectedClass_controller_1 = require("../controllers/selectedClass.controller");
const selectedClassRouter = express_1.default.Router();
exports.selectedClassRouter = selectedClassRouter;
selectedClassRouter.post("/addSelectedClass", selectedClass_controller_1.addSelectedClass);
selectedClassRouter.get("/getSelectedClassIds", selectedClass_controller_1.getSelectedClassIds);
selectedClassRouter.get("/getSelectedClass", selectedClass_controller_1.getSelectedClass);
//# sourceMappingURL=selectedClass.route.js.map