import { getAllCountriesService } from "../services/countries.service.js";
import { GAf_000006 } from "../errors/error.codes.js";

// 1. Get all countries
export const getAllCountries = async (req, res, next) => {
  try {
    try {
      const countries = await getAllCountriesService();
      return res.status(200).send(countries);
    } catch (error) {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).send({ message: GAf_000006 });
  }
};
