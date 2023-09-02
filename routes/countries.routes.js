import { Router } from "express";
import { getAllCountries } from "../controllers/countries.controller.js";

export const countriesRouter = Router();

// 1. Get all countries
countriesRouter.get("/", getAllCountries);
