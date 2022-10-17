const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

// create an instance of express called app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:3000"]
}));

// bringing in routes
const taskRoutes = require("./routes/taskRoutes");

// routing
app.use("/api/tasks", taskRoutes);


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
