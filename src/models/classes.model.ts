import mongoose from "mongoose";

const ClassesSchema = new mongoose.Schema({
  class_name: { type: String, require: true },
  title: { type: String, require: true },
  instructor_name: { type: String, require: true },
  email: { type: String, require: true },
  available_seats: { type: Number, require: true },
  price: { type: Number, require: true },
  duration: { type: String, require: true },
  image: { type: String, require: true },
  enrolled: { type: Number, require: true },
  feedback: { type: String, require: true },
  date: { type: String, require: true },
  status: { type: String, require: true },
});

export default mongoose.models.classes ||
  mongoose.model("Classes", ClassesSchema);
