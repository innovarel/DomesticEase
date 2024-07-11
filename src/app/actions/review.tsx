"use server";

import connectMongo from "../libs/mongo";

export const addReview = async (reviewData: any) => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const reviews = database!.collection("review");
  const review = await reviews.insertOne(reviewData);
  console.log({ review });
  client.close();
  return JSON.parse(JSON.stringify(review));
};

export const getWorkerReviews = async (worker: string) => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const reviews = database!.collection("review");
  const review = await reviews.find({ worker }).toArray();
  console.log({ review });
  client.close();
  return JSON.parse(JSON.stringify(review));
};

export const getAllReviews = async () => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const reviews = database!.collection("review");
  const review = await reviews.find().toArray();
  console.log({ review });
  client.close();
  return JSON.parse(JSON.stringify(review));
};

export const getReviewsType = async (type: string) => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const reviews = database!.collection("review");
  const review = await reviews
    .find({
      service: type,
    })
    .toArray();
  console.log({ review });
  client.close();
  return JSON.parse(JSON.stringify(review.slice(0, 3)));
};

export const getReviewsWorker = async (worker: string) => {
  const mongo = await connectMongo();
  const { database, client } = mongo!;

  const reviews = database!.collection("review");
  const review = await reviews
    .find({
      worker: worker,
    })
    .toArray();
  console.log({ review });
  client.close();
  return JSON.parse(JSON.stringify(review));
};
