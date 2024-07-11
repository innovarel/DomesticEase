"use server";

import { GridFSBucket, MongoClient } from "mongodb";
import connectMongo from "../libs/mongo";

const userExists = async (email: string) => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const users = database.collection("user");
  const user = await users.findOne({ email });
  client.close();
  return user;
};

export const createUser = async (userData: any) => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const users = database.collection("user");
  if (await userExists(userData.email)) {
    throw "User already exists";
  }
  const user = await users.insertOne(userData);
  console.log({ user });
  client.close();

  return JSON.parse(JSON.stringify(user));
};

export const createServiceUser = async (userData: any) => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const users = database.collection("user");
  if (await userExists(userData.email)) {
    throw "User already exists";
  }
  const user = await users.insertOne({
    ...userData,
    type: "service",
    approved: false,
  });
  console.log({ user });
  client.close();

  return JSON.parse(JSON.stringify(user));
};

export const getUser = async (email: string, password: string) => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const users = database.collection("user");
  const user = await users.findOne({ email, password });
  console.log({ user });
  return JSON.parse(JSON.stringify(user));
};

export const getUserInfo = async (email: string) => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const users = database.collection("user");
  const user = await users.findOne({ email });
  console.log({ user });
  client.close();

  return JSON.parse(JSON.stringify(user));
};

export const updateUser = async (email: string, userData: any) => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const users = database.collection("user");
  const user = await users.updateOne({ email }, { $set: userData });
  console.log({ user });
  client.close();

  return JSON.parse(JSON.stringify(user));
};

export const getAllUsers = async () => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const users = database.collection("user");
  const user = await users.find({ type: { $ne: "service" } }).toArray();
  console.log({ user });
  client.close();

  return JSON.parse(JSON.stringify(user));
};

export const getAllServiceUsers = async () => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const users = database.collection("user");
  const user = await users.find({ type: "service" }).toArray();
  console.log({ user });
  client.close();

  return JSON.parse(JSON.stringify(user));
};

export const deleteUser = async (email: string) => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const users = database.collection("user");
  const user = await users.deleteOne({ email });
  console.log({ user });
  client.close();

  return JSON.parse(JSON.stringify(user));
};
