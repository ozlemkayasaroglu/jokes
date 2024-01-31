import path from "path";
import {promises as fs} from "fs";


export async function GET() {

  const jsonDir = path.join(process.cwd(), "component");
  const fileContents= await fs.readFile(jsonDir + "/jokes.json", "utf8");
  return Response.json({data:JSON.parse(fileContents)});


}