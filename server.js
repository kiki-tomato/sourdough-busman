const express = require("express");
const axios = require("axios");
const cors = require("cors");
const compression = require("compression");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 8000;

app.use(compression());
app.use(express.json());
app.use(cors());

const scriptUrl = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_CLIENT_ID}`;

app.get("/load-map-script", async (req, res) => {
  try {
    const mapScript = await axios.get(scriptUrl);
    res.send(mapScript.data);
  } catch (error) {
    console.error("Error fetching map script", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => console.log(`Sever is listening on port ${PORT}`));
