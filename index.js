require("dotenv").config();
const PORT = process.env.PORT || 8080;

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const axios = require("axios");

app.use("/images", express.static("./public/images"));

const videosRoutes = require("./routes/videos");
app.use("/videos", videosRoutes);


app.listen(PORT, () => {
  console.log("Backend server is running at port:" , PORT);
});
