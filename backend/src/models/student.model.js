import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Define the student schema
const studentSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    rollNo: {
      type: Number,
      required: true,
      unique: true,
    },
    Branch: {
      type: String,
      required: true,
    },
    Course: {
      type: String,
      required: true,
    },
    State: {
      type: String,
      required: true,
    },
    Village: {
      type: String,
      required: true,
    },
    PostOffice: {
      type: String,
      required: true,
    },
    PoliceStation: {
      type: String,
      required: true,
    },
    District: {
      type: String,
      required: true,
    },
    PinCode: {
      type: Number,
      required: true,
    },
    AcdemicYear: {
      type: String,
      required: true,
    },
    RefreshToken :{
       type : String
    }
  },
  { timestamps: true }
);

// Encrypt password before saving
studentSchema.pre("save", async function (next) {
  if (this.isModified("Password")) {
    this.Password = await bcrypt.hash(this.Password, 10);
  }
  next();
});

// Method to compare passwords
studentSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.Password);
};

// Method to generate access token
studentSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      rollNo: this.rollNo,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Method to generate refresh token
studentSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const Student = mongoose.model("Student", studentSchema);
