const app = require("./app");

const port = process.env.PORT || 8003;

app.listen(port, "0.0.0.0", () => {
  console.log(`server is running on port:${port}`);
});
