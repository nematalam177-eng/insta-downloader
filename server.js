const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/download", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.json({ success: false });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const html = response.data;

    const match = html.match(/"video_url":"([^"]+)"/);

    if (match && match[1]) {
      let video = match[1].replace(/\\u0026/g, "&");

      return res.json({
        success: true,
        video: video
      });
    }

    return res.json({ success: false });

  } catch (err) {
    return res.json({ success: false });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
