require("dotenv").config();
const PORT = process.env.PORT || 8080;

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.use("/images", express.static("./public/images"));

app.use((req, res, next) => {
  if (!req.query.api_key) {
    return res.status(403).json({
      message: "Please use an API key - try adding api_key query to the URL request"
    })
  }
  next();
})

const videosRoutes = require("./routes/videos");
app.use("/videos", videosRoutes);


app.listen(PORT, () => {
  console.log("Backend server is running at port:" , PORT);
});
