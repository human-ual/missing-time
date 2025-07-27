// pages/api/sample-tasks.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

// 🔐 直接用環境變數初始化 Supabase（無需 lib 檔案）
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("drawn", false)
    .order("RANDOM()")
    .limit(6);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: "資料庫錯誤" });
  }

  return res.status(200).json({ tasks: data });
}
