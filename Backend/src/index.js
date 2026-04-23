const path = require("path");
const dotenv = require("dotenv");

const envResult = dotenv.config();
if (envResult.error) {
  dotenv.config({ path: path.join(__dirname, ".env") });
}
const app = require("./app");
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
