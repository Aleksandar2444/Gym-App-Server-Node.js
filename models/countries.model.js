import mongoose from "mongoose";

const { Schema } = mongoose;

const countriesSchema = new Schema({
  value: {
    type: String,
  },
  viewValue: {
    type: String,
  },
});

export const Countries = mongoose.model("Countries", countriesSchema);
