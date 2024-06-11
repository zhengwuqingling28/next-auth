import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  try {
    const context = await MongoClient.connect("mongodb://127.0.0.1/nextutor");
    return context;
  } catch (error) {
    console.log(error);
  }
};
