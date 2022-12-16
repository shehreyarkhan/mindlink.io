const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");

//CHECK  FOR PRODUCTION OR DEVELOPMENT
const port = process.env.PORT || 5000;

//INITIALIZE EXPRESS APP
const app = express();

//Allow cross origin request
app.use(cors());

//DB CONNECTION
mongoose.connect(
  "mongodb+srv://sherry:12345@gql-mindlink.hgujsku.mongodb.net?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => {
  console.log("connected to db");
});

//GRAPHIQL API FRONT
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const data = [{ name: "Bitcoin", symbol: "BTC", price: "$18000" }];

app.get("/crypto", async (req, res) => {
  if (req.query.bring == "names") {
    const coinDeskNames = await axios
      .get("https://www.coindesk.com/data/")
      .then((response) => {
        const html = response.data;
        // console.log(html
        const $ = cheerio.load(html);

        try {
          let i = 1;
          $("a div div", html).each(function (id, el) {
            if (id == 1 || id == i) {
              const cName = $(el).children("span").text();
              data.push({
                name: cName,
              });
              i += 5;
            }
          });
          res.send(data);
        } catch (err) {
          console.log(err);
        }

        // console.log(data)
      })
      .catch((error) => console.log(error));
  } else if (req.query.bring == "prices") {
    const prices = [];

    const config = {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const coinDeskPrices = await axios
      .get("https://www.coindesk.com/data/", config)
      .then((response) => {
        const html = response.data;
        // console.log(html
        const $ = cheerio.load(html);

        try {
          let i = 1;

          $("a div .brrRIQ", html).each(function (id, el) {
            const cPrice = $(el).text();
            // console.log(cPrice);
            prices.push(cPrice);
          });
          res.send(prices);
        } catch (err) {
          console.error(err);
        }
      });
  } else res.send("Query error ");
});

app.get("/blog", async (req, res) => {
  await axios.get("https://www.coindesk.com/web3/").then((response) => {
    const html = response.html;
    const $ = cheerio.load(html);
    console.log(html);
  });

  // $("div", html).each(function(id, el) {
  //   console.log(el)

  // })
});


//LISTENING ON
app.listen(port, console.log(`server listening on port ${port}`));

// app.get('/', (req, res) => {
//   console.log("HELLO WORD")
// })
console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
