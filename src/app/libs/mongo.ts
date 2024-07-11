import { MongoClient } from "mongodb";

const connectMongo = async () => {
  const uri =
    "mongodb+srv://basitdev:Z8TTCBtR5z0z76QC@domestic-ease-cluster.ygthspq.mongodb.net/";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("domestic-ease-client");
    console.log("Connected to MongoDB");
    return { client, database };
  } catch (e) {
    console.error(e);
  }
};

export default connectMongo;
