require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const dns = require("dns")

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Schema and model
const urlSchema = new mongoose.Schema({
  original_url: {type: String, required: true, unique: true},
  short_url: {type: Number, required: true, unique: true}
})
const URLModel = mongoose.model("url", urlSchema)

// Middleware
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: false }))

//Endpoints
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/shorturl", (req, res, next) => {
  app.use(bodyParser.json())
  next()
}, (req, res) => {
  try {
    let url = req.body.url
    if (!url.startsWith("http")) url = "https://" + url
    
    const urlObj = new URL(url)
    console.debug(urlObj)
    dns.lookup(urlObj.hostname, async (err, address, family) => {
      if (!address) res.json({ error: "invalid url" })
      else {
        const original_url = urlObj.href
        const foundURL = await URLModel.findOne({ original_url }).select("-_id -__v")
        if (!foundURL) {
          const short_url = await URLModel.count() + 1
          URLModel.create({ original_url, short_url })
          res.json({ original_url, short_url })
        } else {
          res.json({ original_url, short_url: foundURL.short_url })
        }

      }
    })
  } catch { res.json({ error: "invalid url" }) }
})

app.get("/api/shorturl/:shorturl", async (req, res) => {
  const short_url = +req.params.shorturl
  const queryRes = await URLModel.findOne({ short_url: short_url}).select("-_id -__v");
  console.debug(queryRes)
  if (!queryRes) res.json({ error: "No short URL found for the given input" })
  else res.redirect(queryRes.original_url)
  // else res.status(301).redirect("www.google.com")

});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
