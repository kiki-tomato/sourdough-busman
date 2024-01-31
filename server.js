const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 8000;

app.maxHttpHeaderSize = 100000000;
app.use(express.json());
app.use(cors());

app.get("/load-map-script", async (req, res) => {
  const scriptUrl = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_CLIENT_ID}`;
  const mapScript = await axios.get(scriptUrl);
  res.json(mapScript.data);
});

app.listen(PORT, () => console.log(`Sever is listening on port ${PORT}`));
