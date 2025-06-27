import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import dotenv from "dotenv";
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
dotenv.config("./.env");
app.use(clerkMiddleware())


app.get("/", (req, res) => res.send("Server is Live!"));
app.use("/api/inngest", serve({ client: inngest, functions }));

app.listen(port, () => {
  connectDB();
  console.log(`Server is runnng on http://localhost:${port}`);
});
