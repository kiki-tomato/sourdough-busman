const axios = require("axios");

const API_SECRET = process.env.REACT_APP_NAVER_CLIENT_ID;
const url = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${API_SECRET}`;

const handler = async (event) => {
  try {
    const response = await axios.get(url, {
      "Access-Control-Allow-Origin": "oapi.map.naver.com", // Allow requests from any origin
      "Content-Type": "text/javascript", // Set the content type to JavaScript
    });
    const mapScript = response.data;

    // const htmlResponse = `
    //   <script type="text/javascript">
    //     ${mapScript}
    //   </script>
    // `;

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "oapi.map.naver.com", // Allow requests from any origin
        "Content-Type": "text/javascript", // Set the content type to JavaScript
        // "Content-Type": "text/html",
      },
      body: mapScript,
    };
  } catch (error) {
    const { status, statusText, headers, data } = error.response;

    return {
      statusCode: status,
      body: JSON.stringify(status, statusText, headers, data),
    };
  }
};

module.exports = { handler };
