"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentsRouter = void 0;
const express_1 = __importDefault(require("express"));
const verifyJWT_1 = require("../middlewares/verifyJWT");
const payments_controller_1 = require("../controllers/payments.controller");
const paymentsRouter = express_1.default.Router();
exports.paymentsRouter = paymentsRouter;
paymentsRouter.post("/create-payment-intent", verifyJWT_1.verifyJWT, payments_controller_1.createPaymentIntent);
paymentsRouter.post("/payments", verifyJWT_1.verifyJWT, payments_controller_1.payments);
paymentsRouter.get("/getPaymentDetails", verifyJWT_1.verifyJWT, payments_controller_1.getPaymentDetails);
paymentsRouter.get("/getEnrolledClasses", verifyJWT_1.verifyJWT, payments_controller_1.getEnrolledClasses);
//# sourceMappingURL=payments.route.js.map