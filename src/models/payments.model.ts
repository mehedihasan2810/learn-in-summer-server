import mongoose from "mongoose";

const PaymentsSchema = new mongoose.Schema({
  student_email: { type: String, require: true },
  instructor_email: { type: String, require: true },
  transactionId: { type: String, require: true },
  price: { type: String, require: true },
  classId: { type: String, require: true },
  status: { type: String, require: true },
  date: { type: Number, require: true },
});

export default mongoose.models.payments ||
  mongoose.model("Payments", PaymentsSchema);
