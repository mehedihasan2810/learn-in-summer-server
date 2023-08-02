import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  role: { type: String, require: true },
  photoUrl: { type: String, require: true },
  date: { type: Number, require: true },
});

export default mongoose.models.users || mongoose.model("Users", UsersSchema);
