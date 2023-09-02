import { BadRequest } from "../errors/error.js";
import { GAf_000017 } from "../errors/error.codes.js";
import { User } from "../models/user.model.js";

// 1. Update user profile
export const updateUserProfileService = async (user, updateData) => {
  try {
    const userId = await User.findOne({ _id: user._id });

    const updatedUser = await User.updateOne(userId, {
      gymNickname: updateData.gymNickname,
      country: updateData.country,
      city: updateData.city,
      about: updateData.about,
    });

    return updatedUser;
  } catch (error) {
    throw new BadRequest(GAf_000017, `ERROR: ${error}`);
  }
};
