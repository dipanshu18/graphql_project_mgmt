import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { graphqlHTTP } from "express-graphql";

import connectDB from "./config/db.js";
import schema from "./schema/schema.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;
const app = express();

// Connect to mongoDB
connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: NODE_ENV === "development",
  })
);

app.listen(PORT, () => {
  console.log();
  console.log(colors.rainbow(`Server runnning on port ${PORT}`));
});
