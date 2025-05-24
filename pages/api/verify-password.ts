// pages/api/verify-password.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const inputPassword = req.body.password;
  const adminPassword = process.env.ADMIN_DRAW_PASSWORD;

  if (inputPassword === adminPassword) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

