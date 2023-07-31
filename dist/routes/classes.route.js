"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classesRouter = void 0;
const express_1 = __importDefault(require("express"));
const classes_controller_1 = require("../controllers/classes.controller");
const classesRouter = express_1.default.Router();
exports.classesRouter = classesRouter;
classesRouter.get("/allClasses", classes_controller_1.allClasses);
classesRouter.get("/getClass/:id", classes_controller_1.getClass);
classesRouter.post("/addClass", classes_controller_1.addClass);
classesRouter.put("/updateClass/:id", classes_controller_1.updateClass);
classesRouter.delete("/deleteClass/:id", classes_controller_1.deleteClass);
//# sourceMappingURL=classes.route.js.map