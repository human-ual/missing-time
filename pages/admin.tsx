import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const AdminPage = () => {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);
  const router = useRouter();

  const checkPassword = async () => {
    const res = await fetch("/api/verify-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthorized(true);
      fetchTasks();
    } else {
      setError("密碼錯誤，請再試一次");
    }
  };

  const fetchTasks = async () => {
    const { data, error } = await supabase.from("tasks").select("*").order("id");
    if (!error && data) setTasks(data);
  };

  const deleteTask = async (id: number) => {
    await supabase.from("tasks").delete().eq("id", id);
    fetchTasks();
  };

  const markAsDrawn = async (id: number) => {
    await supabase.from("tasks").update({ drawn_at: new Date().toISOString() }).eq("id", id);
    fetchTasks();
  };

  if (!authorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black text-white font-pixel">
        <h1 className="text-2xl font-bold mb-4"><span className="zh">請輸入密碼</span></h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-4 py-2 rounded mb-2 text-black"
        />
        <button
          onClick={checkPassword}
          className="px-4 py-2 bg-ghostBlue text-black rounded hover:scale-105 transition-transform border-2 border-white"
        >
          <span className="zh">確認</span>
        </button>
        {error && <p className="text-red-500 mt-2 zh">{error}</p>}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-black text-white font-pixel">
      <h1 className="text-3xl font-bold mb-4"><span className="zh">任務管理</span></h1>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded shadow text-black">
            <p className="text-lg font-medium zh">{task.content}</p>
            <p className="text-sm italic text-gray-600 zh">{task.message}</p>
            <p className="text-sm text-gray-500 zh">By {task.author}</p>
            <p className="text-sm text-gray-500 zh">
              {task.drawn_at ? `✅ 已抽取於 ${new Date(task.drawn_at).toLocaleString()}` : "❌ 尚未抽取"}
            </p>
            <div className="flex gap-2 mt-2">
              {!task.drawn_at && (
                <button
                  onClick={() => markAsDrawn(task.id)}
                  className="px-3 py-1 bg-ghostPink text-black rounded border-2 border-white hover:scale-105 transition-transform"
                >
                  <span className="zh">標記為已抽取</span>
                </button>
              )}
              <button
                onClick={() => deleteTask(task.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 border-white border-2"
              >
                <span className="zh">刪除</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
