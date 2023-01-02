const express = require("express");
const axios = require("axios");
const cors = require("cors");
const config = require("./config.json");

const app = express();
const port = 3008;
app.use(
  cors({
    allowedHeaders: ["Content-Type"],
    origin: "*",
    preflightContinue: true,
  })
);
app.use(express.json());

app.post("/id-verification", async (req, res) => {
  const identification = {
    name_first: req.body.firstName,
    name_last: req.body.lastName,
    address_line_1: req.body.line1,
    address_line_2: req.body.line2,
    address_city: req.body.city,
    address_state: req.body.state,
    address_postal_code: req.body.zip,
    address_country_code: req.body.country,
    document_ssn: req.body.ssn,
    email_address: req.body.email,
    birth_date: req.body.dob,
  };

  const request_config = {
    method: "post",
    url: "https://sandbox.alloy.co/v1/evaluations/",
    headers: {
      Authorization: config.auth_token,
      "Content-Type": "application/json",
    },
    data: identification,
  };
  const alloy_reponse = await axios(request_config);

  if (alloy_reponse.status === 201 && alloy_reponse.data?.summary?.outcome) {
    return res.send({
        outcome: alloy_reponse.data.summary.outcome,
      });
  }else{
      //return some error
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});
