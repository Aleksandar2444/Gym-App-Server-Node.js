import { GeneralError } from "../errors/error.js";
import { GAf_000018 } from "../errors/error.codes.js";
import { Countries } from "../models/countries.model.js";

// 1. Get all countries
export const getAllCountriesService = async () => {
  try {
    const countries = await Countries.find({})
      .populate("value", "viewValue")
      .sort({
        viewValue: "asc",
      });

    return countries;
  } catch (error) {
    throw new GeneralError(GAf_000018, `ERROR: ${error}`);
  }
};
