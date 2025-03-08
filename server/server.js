const app = require("./app");

const port = process.env.PORT || 8003;

app.listen(port,() => {
  console.log(`server is running on port:${port}`);
});

