const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();


// create an instance of express called app
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Task Manager");
});

// when we deploy app to actual server, that server provides
// us with a port number, and we use that port from a .env file
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("[SUCCESS]: Database Connected...");

    app.listen(PORT, () => {
      console.log(`Server listening on port...${PORT}`);
    });
  })
  .catch((err) => {
    console.log("[FAILED]: Database Connection Failed!", error);
  });