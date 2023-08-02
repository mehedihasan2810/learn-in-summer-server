import mongoose from "mongoose";

const SelectedClassesSchema = new mongoose.Schema({
  email: { type: String, require: true },
  selectedClass: [String],
});

export default mongoose.models.selectedClasses ||
  mongoose.model("selectedClasses", SelectedClassesSchema);
