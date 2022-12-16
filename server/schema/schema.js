const graphql = require("graphql");
const _ = require("lodash");
const axios = require("axios");
const cheerio = require("cheerio");

//MONGO DB SCHEMA MODELS
const Content = require("../models/content");
const Creator = require("../models/creator");
const SocialMediaPost = require("../models/socialmediapost");
const Crypto = require("../models/crypto");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const SocialMediaPostType = new GraphQLObjectType({
  name: "SocialMediaPost",
  fields: () => ({
    id: { type: GraphQLID },
    topic: { type: GraphQLString },
    content: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    creator: {
      type: CreatorType,
      resolve(parent, args) {
        return Creator.findById(parent.creatorId);
      },
    },
  }),
});

const ContentType = new GraphQLObjectType({
  name: "Content",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    title: { type: GraphQLString },
    result: { type: GraphQLString },
    creator: {
      type: CreatorType,
      resolve(parent, args) {
        // return _.find(creators, { id: parent.id });
        return Creator.findById(parent.creatorId);
      },
    },
  }),
});

const CreatorType = new GraphQLObjectType({
  name: "Creator",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    businessName: { type: GraphQLString },
    niche: { type: GraphQLString },
    password: { type: GraphQLString },
    shortDescription: { type: GraphQLString },
    image: { type: GraphQLString },
    isSubscribed: { type: GraphQLBoolean },
    isOnTrail: { type: GraphQLBoolean },
    isLogin: { type: GraphQLBoolean },
    contents: {
      type: new GraphQLList(ContentType),
      resolve(parent, args) {
        return Content.find({ creatorId: parent.id });
        // return _.filter(contents, { id: parent.id });
      },
    },
    social: {
      type: new GraphQLList(SocialMediaPostType),
      resolve(parent, args) {
        return SocialMediaPost.find({ creatorId: parent.id });
      },
    },
  }),
});

const CryptoType = new GraphQLObjectType({
  name: "Crypto",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    symbol: { type: GraphQLString },
    trend: { type: GraphQLBoolean },
    imgUrl: { type: GraphQLString },
    price: { type: GraphQLString },
    sequence: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    content: {
      type: ContentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        // return _.find(contents, { id: args.id });
        return Content.findById(args.id);
      },
    },
    creator: {
      type: CreatorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(creators, { id: args.id });
        return Creator.findById(args.id);
      },
    },
    contents: {
      type: new GraphQLList(ContentType),
      resolve(parent, args) {
        // return contents;
        return Content.find({});
      },
    },

    cryptos: {
      type: new GraphQLList(CryptoType),
      resolve(parent, args) {
        // return creators;
        return Crypto.find({});
      },
    },

    creators: {
      type: new GraphQLList(CreatorType),
      resolve(parent, args) {
        // return creators;
        return Creator.find({});
      },
    },

    posts: {
      type: new GraphQLList(SocialMediaPostType),
      resolve(parent, args) {
        return SocialMediaPost.find({});
      },
    },

    post: {
      type: SocialMediaPostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return SocialMediaPost.findById(args.id);
      },
    },
  },
});

const config = {
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
};

//CRUD OPERATIONS
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCoins: {
      type: CryptoType,
      args: {
        name: { type: GraphQLString },
        price: { type: GraphQLString },
        symbol: { type: GraphQLString },
        trend: { type: GraphQLBoolean },
        imgUrl: { type: GraphQLString },
        sequence: { type: GraphQLInt },
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        // const check = Crypto.find({})
        const prices = [];
        const coins = [];
        const symbols = [];
        const images = [];
        const coinPack = [];

        (async () => {
          const res = await axios.get("https://www.coindesk.com/data/", config);
          try {
            const html = res.data;
            const $ = cheerio.load(html);
            $("a div .brrRIQ", html).each(function (id, el) {
              const cPrice = $(el).text();
              const crypt = new Crypto({ price: cPrice });
              prices.push(crypt);

              // crypt.save();
            });
            console.log(prices.length + " prices");

            let identifier = 2;

            $("a div div", html).each(function (idx, el) {
              const csymbol = $(el)
                .children(".inner-column div .fUOSEs")
                .text();
              // console.log(idx)

              if (idx == identifier) {
                const txtArray = csymbol.split("2");
                const symbl = new Crypto({ symbol: txtArray[0] });
                // console.log(idx)
                symbols.push(symbl);

                // crypt.save();
                identifier += 5;
              }
            });
            console.log(symbols.length + " symbols");

            axios.get("https://www.coindesk.com/data/").then((response) => {
              const html = response.data;
              // console.log(html
              const $ = cheerio.load(html);

              try {

                let init = 0;
                $("a div .gRkssw", html).each(function (id, el) {
                  if(  init == id ){
                    // console.log(el)
                    const cImg = $(el).children("img").attr("src");
                    // console.log(cImg)
              images.push(cImg);
              init+=2;
            }
                  });

console.log(images[0])

                let i = 1;
                $("a div div", html).each(function (id, el) {
                  if (id == 1 || id == i) {
                    const cName = $(el).children("span").text();
                    coins.push({
                      name: cName,
                    });
                    i += 5;
                  }
                  // coins.map((item) => {
                  //   let coin = new Crypto({
                  //     name: item.name,
                  //   });
                  //   console.log(coin)
                  // });

                  // coins.save();
                });

                console.log(coins.length + " coins");
                if (coins.length !== 0)
                  for (let i = 0; i < 150; i++) {
                    const obj = new Crypto({
                      name: coins[i]?.name,
                      price: prices[i].price,
                      symbol: symbols[i].symbol,
                      sequence: i + 1,
                      imgUrl: images[i]
                    });

                    coinPack.push({
                      name: coins[i]?.name,
                      price: prices[i].price,
                      symbol: symbols[i].symbol,
                      sequence: i + 1,
                      imgUrl: images[i]

                    });
//turn back on //
                    obj.save();
                  }
                // console.log(coinPack);
                // return coinPack[{}]
              } catch (err) {
                console.log(err);
              }
            });
          } catch (err) {
            console.error(err);
          }
        })();
      },
    },

    updateCoins: {
      type: CryptoType,
      args: {
        name: { type: GraphQLString },
        price: { type: GraphQLString },
        symbol: { type: GraphQLString },
        trend: { type: GraphQLBoolean },
        imgUrl: { type: GraphQLString },
        id: { type: GraphQLID },
        sequence: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let doc;
        let currentID = args.sequence;
        (async () => {
          doc = await Crypto.findOne({ sequence: args.sequence });
          doc.price = "$17,434.05"
          console.log(doc);
          currentID = doc.id;
        })().then(() => {

           doc.save();
         new Crypto({
            id: currentID,
            price: doc.price,
            name: doc.name,
            symbol: doc.symbol,
            sequence: args.sequence
          })
        });
      },
      
    },

    //ADD USER
    addCreator: {
      type: CreatorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        businessName: { type: GraphQLString },
        niche: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        shortDescription: { type: GraphQLString },
        image: { type: GraphQLString },
        isSubscribed: { type: GraphQLBoolean },
        isOnTrail: { type: GraphQLBoolean },
        isLogin: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        let creator = new Creator({
          name: args.name,
          email: args.email,
          businessName: args.businessName,
          niche: args.niche,
          password: args.password,
          shortDescription: args.shortDescription,
          image: args.image,
          isSubscribed: args.isSubscribed,
          isOnTrail: args.isOnTrail,
          isLogin: args.isLogin,
        });

        return creator.save();
      },
    },

    //ADD CONTENT
    addContent: {
      type: ContentType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLString },
        creatorId: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        result: { type: GraphQLString },
      },
      resolve(parent, args) {
        let content = new Content({
          name: args.name,
          genre: args.genre,
          creatorId: args.creatorId,
        });
        return content.save();
      },
    },

    //ADD POST
    addPost: {
      type: SocialMediaPostType,
      args: {
        topic: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        creatorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let post = new SocialMediaPost({
          topic: args.topic,
          content: args.content,
          createdAt: args.createdAt,
          creatorId: args.creatorId,
        });
        return post.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
