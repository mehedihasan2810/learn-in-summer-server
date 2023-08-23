import mongoose from "mongoose";

const PaymentsSchema = new mongoose.Schema({
  class_name: {type: String, require: true},
  instructor_name: {type: String, require: true},
  student_name: {type: String, require: true},
  student_email: { type: String, require: true },
  instructor_email: { type: String, require: true },
  transactionId: { type: String, require: true },
  price: { type: Number, require: true },
  classId: { type: String, require: true },
  status: { type: String, require: true },
  date: { type: Number, require: true },
});

export default mongoose.models.payments ||
  mongoose.model("Payments", PaymentsSchema);
