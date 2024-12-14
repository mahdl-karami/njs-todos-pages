import mongoose from "mongoose";

export default async function ConnectToDB() {
  console.log("Check database connection ...");
  if (mongoose.connections[0].readyState) return console.log("Already connected.");
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected.");
}
