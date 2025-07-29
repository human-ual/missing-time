// pages/api/sample-tasks.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("id, content, author, message")
      .is("drawn_at", null); // ✅ 修改這一行

    if (error) {
      console.error("❌ Supabase 錯誤：", error);
      return res.status(500).json({ error: "資料庫錯誤", detail: error });
    }

    if (!Array.isArray(data)) {
      console.warn("⚠️ tasks 資料格式錯誤", data);
      return res.status(500).json({ error: "資料格式錯誤" });
    }

    const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 6);
    return res.status(200).json({ tasks: shuffled });
  } catch (err: any) {
    console.error("❌ 未預期錯誤：", err.message);
    return res.status(500).json({ error: "未知錯誤" });
  }
}
