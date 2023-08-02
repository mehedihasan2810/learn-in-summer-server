"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnrolledClasses = exports.getPaymentDetails = exports.payments = exports.createPaymentIntent = void 0;
const payments_model_1 = __importDefault(require("../models/payments.model"));
const selectedClass_model_1 = __importDefault(require("../models/selectedClass.model"));
const classes_model_1 = __importDefault(require("../models/classes.model"));
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const createPaymentIntent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { price } = req.body;
        const amount = price * 100;
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            payment_method_types: ["card"],
        });
        res.status(201).json({
            clientSecret: paymentIntent.client_secret,
        });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.createPaymentIntent = createPaymentIntent;
const payments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentInfo = req.body;
        const result = new payments_model_1.default(paymentInfo);
        yield result.save();
        yield selectedClass_model_1.default.findOneAndUpdate({ email: paymentInfo.student_email }, { $pull: { selectedClassIds: paymentInfo.classId } });
        yield classes_model_1.default.findByIdAndUpdate({ _id: paymentInfo.classId }, { $inc: { enrolled: 1, available_seats: -1 } });
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.payments = payments;
const getPaymentDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const result = yield payments_model_1.default.find({
            student_email: email,
        }).sort({ date: -1 });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getPaymentDetails = getPaymentDetails;
const getEnrolledClasses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const paymentedItems = yield payments_model_1.default.find({
            student_email: email,
        });
        const enrolledClasses = yield classes_model_1.default.find({
            _id: {
                $in: paymentedItems.map((item) => item.classId),
            },
        });
        res.status(200).json(enrolledClasses);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getEnrolledClasses = getEnrolledClasses;
//# sourceMappingURL=payments.controller.js.map