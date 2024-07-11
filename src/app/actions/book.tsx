"use server";
import { ObjectId } from "mongodb";
import connectMongo from "../libs/mongo";

export const findService = async (service: string, date: string) => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;
  const users = database!.collection("user");
  console.log(service);

  // Find all users that match the criteria
  const usersWithService = await users
    .find({
      $and: [{ type: "service" }, { service: service }, { approved: true }],
    })
    .toArray();

  // Iterate over the users to check if they have orders on the specified date
  for (const user of usersWithService) {
    const orders = database!.collection("order");
    const order = await orders.findOne({
      $and: [{ worker: user.email }, { date: date }],
    });
    console.log({ order });
    // If the user does not have an order on the specified date, return their information
    if (!order) {
      client.close();
      return JSON.parse(JSON.stringify(user));
    }
  }

  // If no user is available for the service on the specified date, return an empty object or a specific message
  client.close();
  return {}; // or return { message: "No user is available for the service on the specified date." };
};

export const createOrder = async (orderData: any) => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const orders = database!.collection("order");
  const order = await orders.insertOne({ ...orderData, status: "pending" });
  console.log({ order });
  client.close();

  return JSON.parse(JSON.stringify(order));
};

export const getOrders = async (email: string) => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const orders = database!.collection("order");
  const order = await orders.find({ email: email }).toArray();
  console.log({ order });
  client.close();

  return JSON.parse(JSON.stringify(order));
};

export const getAllOrders = async () => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const orders = database!.collection("order");
  const order = await orders.find().toArray();
  console.log({ order });
  client.close();

  return JSON.parse(JSON.stringify(order));
};

export const getSerivcesOrders = async (email: string) => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const orders = database!.collection("order");
  const order = await orders.find({ worker: email }).toArray();
  console.log({ order });
  client.close();

  return JSON.parse(JSON.stringify(order));
};

export const updateOrder = async (data: any, status: string) => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const orders = database!.collection("order");
  const order = await orders.updateOne(
    {
      ...data,
    },
    { $set: { status } }
  );
  console.log({ order });
  client.close();

  return JSON.parse(JSON.stringify(order));
};

export const getOrder = async (id: string) => {
  console.log({ id });
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const orders = database!.collection("order");
  var o_id = new ObjectId(id);
  const order = await orders.findOne({ _id: o_id });
  console.log({ order });
  client.close();

  return JSON.parse(JSON.stringify(order));
};
