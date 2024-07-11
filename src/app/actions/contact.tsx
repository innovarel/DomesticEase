"use server";
import connectMongo from "../libs/mongo";

export const createContactInquiry = async (data: any) => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const contacts = database!.collection("contact");
  const contac = await contacts.insertOne(data);
  client.close();

  return JSON.parse(JSON.stringify(contac));
};

export const getAllContactInquiries = async () => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const contacts = database!.collection("contact");
  const contac = await contacts.find().toArray();
  client.close();

  return JSON.parse(JSON.stringify(contac));
};
