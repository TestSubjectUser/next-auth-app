import { MongoClient } from "mongodb";

async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://KhushalTest:CvfOhi5WGBslGWo7@cluster0.c2ehm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  return client;
}

export default connectDatabase;
