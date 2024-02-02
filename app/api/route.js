
import { MongoClient } from "mongodb";

export async function GET() {
  const mongodb = "mongodb://localhost:27017/jokes-db";
  const client = new MongoClient(mongodb);
  await client.connect();

  const db = client.db(); 
  const collection = db.collection("jokes"); 
  const data = await collection.find({}).toArray();

  return Response.json(data);

}
