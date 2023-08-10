const CODES = {
  BAD_REQUEST: {
    code: "BAD_REQUEST",
    message: "The request is not in the correct format.",
    status: 400,
  },
  DATA_FOUND: {
    code: "DATA_FOUND",
    message: "Data found.",
    status: 201,
  },
  DATA_NOT_FOUND: {
    code: "DATA_NOT_FOUND",
    message: "Data not found.",
    status: 201,
  },
  ERROR: {
    code: "ERROR_GENERAL",
    message: "Code error.",
    status: 500,
  },
  ERROR_PLANET: {
    code: "ERROR_PLANET",
    message: "The selected planet is the same planet as the character.",
    status: 500,
  },
  ERROR_LOGS: {
    code: "ERROR_LOGS",
    message: "Error getting call logs.",
    status: 500,
  },
};

module.exports = { CODES };
