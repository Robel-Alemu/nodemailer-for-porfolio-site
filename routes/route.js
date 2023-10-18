const express = require("express");

const sendMail = require("../controllers/sendMessage");
const router = express.Router();

router.post("/send-mail", sendMail);

module.exports = {
  routes: router,
};
