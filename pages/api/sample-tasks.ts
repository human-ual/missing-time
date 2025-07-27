import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabase
    .from("tasks")
    .select("id, content, author")
    .eq("drawn", false);

  if (error) {
    console.error("❌ Supabase 錯誤:", error);
    return res.status(500).json({ error: "資料庫錯誤", detail: error.message });
  }

  if (!Array.isArray(data)) {
    console.error("⚠️ 回傳格式不是陣列:", data);
    return res.status(500).json({ error: "回傳資料格式錯誤" });
  }

  const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 6);
  return res.status(200).json({ tasks: shuffled });
}
