"use server";
import { ObjectId } from "mongodb";
import connectMongo from "../libs/mongo";

export const createShopItem = async (itemData: any) => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const shop = database.collection("items");

  const item = await shop.insertOne(itemData);
  client.close();

  return JSON.parse(JSON.stringify(item));
};

export const getAllItems = async () => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const shop = database.collection("items");

  const items = await shop.find({}).toArray();
  client.close();

  return JSON.parse(JSON.stringify(items));
};

export const deleteItem = async (id: string) => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const shop = database.collection("items");

  const item = await shop.deleteOne({ _id: new ObjectId(id) });
  client.close();
};
