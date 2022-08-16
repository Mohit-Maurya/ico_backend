import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
// import routes from "./routes/test.js";

const app = express();
const port = 8080;
const appName = "ICO";
mongoose.Promise = global.Promise;
// Connect URL
const url = `mongodb+srv://admin:uowAAbc5JFYDRcIu@cluster0.3kujo1u.mongodb.net/?retryWrites=true&w=majority`;

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
    // const db = client.db('IcoDatabase');
    // console.log(mongoose.connection.getClient().db("IcoDatabase").find({}));
    console.log(`MongoDB/mongoose Connected: ${url}`);
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
// routes(app);

app.get("/", (req, res) => {
  res.send(`${appName} application is running on port: ${port}`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
