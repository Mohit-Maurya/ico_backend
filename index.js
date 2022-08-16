import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
// import routes from "./routes/<routesName>"; <------

const app = express();
const port = 8080;
//TODO: Create database
const database = ""; //<-----
const appName = "";
mongoose.Promise = global.Promise;
// Connect URL
const url = `mongodb://localhost:27017/${database}`;

// Connect to MongoDB
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      return console.log(err);
    }
    console.log(`MongoDB/mongoose Connected: ${url}`);
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
routes(app);

app.get("/", (req, res) => {
  res.send(`${appName} application is running on port: ${port}`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
