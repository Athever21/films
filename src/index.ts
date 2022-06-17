import express from 'express';
import { PrismaClient } from "@prisma/client"
const app = express();


const prisma = new PrismaClient();

console.log(prisma.movieInfo.findMany())
//@ts-ignore
app.get('/', (req,res) => {
  //@ts-ignore
  res.json({a: "d"});
})
console.log("g");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening at ${PORT}`));