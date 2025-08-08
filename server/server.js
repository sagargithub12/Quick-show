import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import dotenv from "dotenv";
import { clerkMiddleware } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("Server is Live!"));
app.use("/api/inngest", serve({ client: inngest, functions }));

// Export for Vercel
export default async function handler(req, res) {
  await connectDB();
  app(req, res);
}

// Local development only
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    connectDB();
    console.log(`Server running locally on http://localhost:${port}`);
  });
}
