import { GridFSBucket, MongoClient } from "mongodb";

export async function connectToDb() {
  const client = new MongoClient(
    "mongodb+srv://basitdev:Z8TTCBtR5z0z76QC@domestic-ease-cluster.ygthspq.mongodb.net/"!,
    {}
  );
  const bucket = new GridFSBucket(client.db(), {
    bucketName: "images",
  });

  await client.connect();
  console.log("Connected to the Database ");
  return { client, bucket: bucket! };
}
