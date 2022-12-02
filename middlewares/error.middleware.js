import { GeneralError } from "../errors/error.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).send({
      status: "Error",
      message: err.message,
    });
  }

  return res.status(500).send({
    status: "Error",
    message: err.message,
  });
};
