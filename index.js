"use strict";
const express = require("express");
const cors = require("cors");
const config = require("./config");
const routes = require("./routes/route");
const Endpoint = express();

Endpoint.use(express.json());
Endpoint.use(cors());

Endpoint.use("/api", routes.routes);

Endpoint.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);
