import { updateUserProfileService } from "../services/user-profile.service.js";
import { GAf_000005 } from "../errors/error.codes.js";

// 1. Update user profile
export const updateUserProfile = async (req, res, next) => {
  try {
    const user = req.user;

    try {
      const updateData = req.body;
      if (!updateData) return res.sendStatus(403);

      await updateUserProfileService(user, updateData);
      res.sendStatus(204);
    } catch (error) {
      res.status(403).send(error);
    }
  } catch (error) {
    res.status(500).send({ message: GAf_000005 });
  }
};
