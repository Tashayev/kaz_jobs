import mongoose, { Schema } from "mongoose"

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 1000,
    },
    salary: {
      type: Number,
      trim: true,
    },
    location: {
      type: String,
    },
    skills: {
      type: [String],
    },
    deadline: {
      type: Date,
      default: Date.now,
    },
    employer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["full-time", "part-time", "remote"],
    },
  },
  { timestamps: true },
)

export const Job = mongoose.model("Job", jobSchema)
