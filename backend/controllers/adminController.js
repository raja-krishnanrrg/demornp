import User from "../models/User.js";

//  GET ALL USERS
export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

//  DELETE USER
export const deleteUserByAdmin = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.json({ msg: "User deleted by admin" });
};