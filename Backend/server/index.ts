import express, { Request, Response } from "express";

import dotenv from "dotenv";

import cors from "cors";

dotenv.config();

const obj = {
  a: 1
};

console.log(obj);

const app = express();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send({ abrar: "shaik", roll: "5g2", phone: 773002 });
});

const port_number = process.env.PORT;

app.listen(port_number, () => {
  console.log("Server is sa runnnnning on Port ", port_number);
  // console.log("not working ");
});
