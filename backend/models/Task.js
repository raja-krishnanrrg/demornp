// // import mongoose from "mongoose";

// // const taskSchema = new mongoose.Schema({
// //   title: String,
// //   description: String,
// //   status: {
// //     type: String,
// //     enum: ["pending", "approved", "rejected"],
// //     default: "pending",
// //   },
// //   user: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "User",
// //   },
// // }, { timestamps: true });

// // export default mongoose.model("Task", taskSchema);


// import mongoose from "mongoose";

// const taskSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     description: {
//       type: String,
//       required: true,
//     },

//     status: {
//       type: String,
//       enum: ["pending", "on_process", "completed"],
//       default: "pending",
//     },

//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Task", taskSchema);



import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "on_process", "completed"],
      default: "pending",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);