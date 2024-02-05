import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  const jsonDir = path.join(process.cwd(), "app");
  const fileContents = await fs.readFile(jsonDir + "/component" + "/jokes.json", "utf8");
  return Response.json({ data: JSON.parse(fileContents) });
}