//create a node server with a single get endpoint to return a simple json on port 3001
const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");

const products = require("./Jsons/Products");
const configurationMetadata = require("./Jsons/ConfigurationMetadata");
const serviceAgreement = require("./Jsons/ServiceAgreement");

const schema = require("./creditCardSchema.json");

const whitelist = ["http://localhost:5173"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// Page 1

// display a list of clickable products
app.get("/products", (req, res) => {
  res.send(products)
})

//endpoint to create the service agreement 
app.post("/createServiceAgreement", (req, res) => {
  res.send(products)
})

app.get("/getServiceAgreement", (req, res) => {
  serviceAgreement.status = "Ready for Configuration";
  res.send(serviceAgreement)
});

// Page 2 

app.get("/getTask", (req, res) => {
  console.log("🚀 ~ file: server.js:15 ~ app.get ~ req", req);
  res.send(schema);
});

app.put("/updateConfigurationData", (req, res) => {
  serviceAgreement.status = "Different Status again hehe";
  res.send(schema);
});


// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
