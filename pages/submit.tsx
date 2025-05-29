// pages/submit.tsx
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SubmitTaskPage() {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitTask = async () => {
    if (!content || !message || !author) {
      alert("請填寫所有欄位！");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("tasks").insert([
      {
        content,
        message,
        author,
      },
    ]);
    setLoading(false);
    if (error) {
      console.error(error);
      alert("投稿失敗，請稍後再試！");
    } else {
      setSuccess(true);
      setContent("");
      setMessage("");
      setAuthor("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-6">
      <h1 className="text-2xl font-bold">✍ 投稿一個任務</h1>
      <input
        className="border p-2 w-full max-w-md rounded"
        placeholder="任務罐子"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        className="border p-2 w-full max-w-md rounded"
        placeholder="有想說的話嗎?（任務補充之類的，說你很想我也可以嘻嘻）"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        className="border p-2 w-full max-w-md rounded"
        placeholder="你是...?（寫大美女或天才這種真的猜不出來呦）"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={submitTask}
        disabled={loading}
      >
        {loading ? "投稿中..." : "送出任務"}
      </button>
      {success && <p className="text-green-600">✅ 投稿成功！</p>}
    </div>
  );
}
