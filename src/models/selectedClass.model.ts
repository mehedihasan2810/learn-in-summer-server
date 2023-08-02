import mongoose from "mongoose";

const SelectedClassesSchema = new mongoose.Schema({
  email: { type: String, require: true },
  selectedClassIds: [String],
});

export default mongoose.models.selectedClasses ||
  mongoose.model("selectedClasses", SelectedClassesSchema);
