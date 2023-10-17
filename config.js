"use strict";
const dotenv = require("dotenv");

dotenv.config();

const { PORT, CLIENT_ID, CLEINT_SECRET, REDIRECT_URI, REFRESH_TOKEN } =
  process.env;

module.exports = {
  port: PORT,
  clientId: CLIENT_ID,
  clientSecret: CLEINT_SECRET,
  redirectUri: REDIRECT_URI,
  refreshToken: REFRESH_TOKEN,
};
