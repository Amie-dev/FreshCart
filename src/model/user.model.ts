import bcrypt from "bcryptjs";
import mongoose, { Schema, Document } from "mongoose";

type UserRole = "user" | "deliveryBoy" | "admin";

interface IUser extends Document {
  _id:mongoose.Types.ObjectId
  name: string;
  password?: string;
  email: string;
  mobile: string;
  role: UserRole;
            image?: string;

  createdAt: Date;
  updatedAt: Date;
  // comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    mobile: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["user", "deliveryBoy", "admin"],
      default: "user",
    },
    image:{
      type:String
    }
  },
  { timestamps: true }
);

// userSchema.pre<IUser>("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   try {
//     this.password = await bcrypt.hash(this.password!, 10);
//     next();
//   } catch (error) {
//     next(error as Error);
//   }
// });

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password!);
};

const User = mongoose.models.User ?? mongoose.model<IUser>("User", userSchema);




export default User;



/*

const snack1 = "";
const snack2 = "cookie";

// Using ||
const choice1 = snack1 || snack2; // "cookie" (because "" is falsy)

// Using ??
const choice2 = snack1 ?? snack2; // "" (because "" is not null/undefined)


*/
