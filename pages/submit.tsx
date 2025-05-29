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
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-black text-white font-pixel">
      <h1 className="text-2xl font-bold mb-4">✍ <span className="zh">1/50</span></h1>

      <input
        className="border p-2 w-full max-w-md rounded bg-white text-black placeholder:text-gray-600 zh"
        placeholder="任務罐子"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        className="border p-2 w-full max-w-md rounded bg-white text-black placeholder:text-gray-600 zh mt-2"
        placeholder="想說的話（任務補充之類的，說你很想我也可以）"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        className="border p-2 w-full max-w-md rounded bg-white text-black placeholder:text-gray-600 zh mt-2"
        placeholder="你是...?（寫大美女或天才這種真的猜不出來呦）"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <button
        className="mt-4 bg-ghostBlue text-black font-bold px-4 py-2 rounded border-2 border-white hover:scale-105 transition-transform disabled:opacity-50"
        onClick={submitTask}
        disabled={loading}
      >
        {loading ? <span className="zh">發送中...</span> : <span className="zh">送出任務</span>}
      </button>

      {success && <p className="text-green-400 mt-3 zh">✅ 發送成功！</p>}
    </div>
  );
}
