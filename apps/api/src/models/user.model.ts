import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(val: string, pwd: string): Promise<boolean>;
  omitPassword(): Pick<
    UserDocument,
    "_id" | "email" | "verified" | "createdAt" | "updatedAt"
  >;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await hashValue(this.password);

  next();
});

userSchema.methods.comparePassword = async function (
  valueToCompareTo: string,
  currentPassword: string
) {
  return await compareValue(valueToCompareTo, this.password);
};

userSchema.methods.omitPassword = function () {
  // Convert document to plain Javascript Object without methods
  const user = this.toObject();

  // Delete password field from the User object
  delete user.password;

  // Return the User without password field
  return user;
};

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
