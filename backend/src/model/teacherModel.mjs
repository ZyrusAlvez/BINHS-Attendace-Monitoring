import mongoose from "mongoose";
import bcrypt from "bcrypt";

const teacherSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }, // Hashed
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }], // Sections they handle
});

// Hash the password before saving the user
teacherSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10); // Salt rounds
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare passwords for login
teacherSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const teacherModel = mongoose.model("Teacher", teacherSchema);

export default teacherModel;