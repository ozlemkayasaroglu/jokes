
// import { MongoClient } from "mongodb";

// export async function GET() {
//   const mongodb = "mongodb://localhost:27017/jokes-db";
//   const client = new MongoClient(mongodb);
//   await client.connect();

//   const db = client.db(); 
//   const collection = db.collection("jokes"); 
//   const data = await collection.find({}).toArray();

//   return Response.json(data);

// }


import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const mongodb = "mongodb://localhost:27017/jokes-db";

    try {
      const client = new MongoClient(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();

      const db = client.db();
      const collection = db.collection("jokes");
      const data = await collection.find({}).toArray();

      res.status(200).json(data);
    } catch (error) {
      console.error("MongoDB connection error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
     
      await client.close();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
