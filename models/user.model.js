import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (message) => "Invalid Email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  refreshTokens: [
    {
      type: String,
    },
  ],
});

userSchema.methods.comparePasswords = async function (loginPassword) {
  const user = this;

  const isPasswordValid = await bcrypt.compare(loginPassword, user.password);

  return isPasswordValid;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password") || user.isNew) {
    const regex = new RegExp(/^(?=.*[\d])(?=.*[!@#$%^&`*])[\w!@#$%^&`*]{8,}$/);
    if (regex.test(user.password) === false) {
      next(new Error("Your password does not follow the selected rules"));
    }

    const hashedPassword = await bcrypt.hash(user.password, 8);

    user.password = hashedPassword;
    return next();
  }
  return next();
});

userSchema.post("save", (error, _doc, next) => {
  if (error.code === 11000) {
    return next({ message: "Email already exists" });
  }
  return next();
});

userSchema.set("toJSON", {
  transform: function (_doc, ret, _opt) {
    delete ret.password;
    delete ret.__v;
    delete ret.refreshTokens;

    return ret;
  },
});

//* Always need to be the last line
export const User = mongoose.model("User", userSchema);
