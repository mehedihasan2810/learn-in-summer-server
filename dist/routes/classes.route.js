"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classesRouter = void 0;
const express_1 = __importDefault(require("express"));
const classes_controller_1 = require("../controllers/classes.controller");
const verifyJWT_1 = require("../middlewares/verifyJWT");
const classesRouter = express_1.default.Router();
exports.classesRouter = classesRouter;
classesRouter.get("/allClasses", classes_controller_1.allClasses);
classesRouter.get("/getClass/:id", classes_controller_1.getClass);
classesRouter.post("/addClass", classes_controller_1.addClass);
classesRouter.put("/updateClass/:id", classes_controller_1.updateClass);
classesRouter.delete("/deleteClass/:id", verifyJWT_1.verifyJWT, classes_controller_1.deleteClass);
classesRouter.get("/getSingleClass/:id", classes_controller_1.getSingleClass);
classesRouter.put("/updateApproveStatus/:id", classes_controller_1.updateApproveStatus);
classesRouter.put("/updateDenyStatus/:id", classes_controller_1.updateDenyStatus);
classesRouter.put("/updateFeedback/:id", classes_controller_1.updateFeedback);
classesRouter.get("/getAInstructorClasses", classes_controller_1.getAInstructorClasses);
//# sourceMappingURL=classes.route.js.map