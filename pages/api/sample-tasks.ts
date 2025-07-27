// pages/api/sample-tasks.ts
import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // 注意要用 service_role key 才能用 eq("drawn", false)
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("drawn", false);

  if (error) return res.status(500).json({ error: "資料庫錯誤", detail: error });

  const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 6);
  return res.status(200).json({ tasks: shuffled });
}

