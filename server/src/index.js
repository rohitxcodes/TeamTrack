// index.js: Entry point - load env, connect DB, start server
require("dotenv").config({ path: "./server/src/.env" });
const app = require("./app");
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
