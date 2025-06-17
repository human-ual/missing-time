// pages/api/draw-task.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { allowRepeat } = req.body;

  // 調用 Supabase 的自訂函數 draw_random_task
  const { data, error } = await supabase.rpc("draw_random_task", {
    allow_repeat: allowRepeat,
  });

  if (error || !data || data.length === 0) {
    return res.status(500).json({ error: error?.message || "No task available" });
  }

  const task = data[0];

  // 若為不允許重複任務，更新 drawn_at 為現在時間
  if (!allowRepeat) {
    await supabase
      .from("tasks")
      .update({ drawn_at: new Date().toISOString() })
      .eq("content", task.content); // 或改為 eq("id", task.id) 更安全
  }

  res.status(200).json({ task });
}
