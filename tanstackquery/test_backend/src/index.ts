const express = require('express');
import type { Request, Response } from 'express';
import type { User } from './users';
const users: User[] = require('./users');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

app.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + '/myhtml.html');
})

app.get("/getusers", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Success",
    users: users
  })
})

app.get("/download", (req: Request, res: Response) => {
  res.download(__dirname + '/download.jpg');
})

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
})