require("dotenv").config();
const express = require("express");
const mongose = require("mongoose");
const app = express();
const reportRoute = require("./routes/reportRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const authRoute = require("./routes/authRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require("cors");

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;
const FRONTEND = process.env.FRONTEND;

var corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/user", authRoute);
app.use("/report", reportRoute);
app.use("/api/product", productRoute);
app.use("/contact", contactRoute);

app.get("/", (req, res) => {
  res.send("Hello NODE API");
});

app.get("/blog", (req, res) => {
  res.send("Hello blog");
});

app.use(errorMiddleware);

mongose
  .connect(MONGO_URL)
  .then(() => {
    console.log("connected to mongoDB");
    app.listen(PORT, () => {
      console.log(`running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
