import mongoose, { ConnectOptions } from "mongoose";
import config from "config";

const db: string = config.get("mongoURI");
const port = config.get("port");

interface MongooseOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
  useFindAndModify: boolean;
  useCreateIndex: boolean;
}

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
} as MongooseOptions);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log(`Connected to MongoDB at port ${port}`);
});

connection.on("error", (err) => {
  console.error(`Failed to connect to MongoDB: ${err}`);
});

export default connection;
