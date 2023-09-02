import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
      minlength: 1,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.model("Comment", commentSchema);
