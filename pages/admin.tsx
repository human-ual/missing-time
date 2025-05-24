// pages/admin/index.tsx
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
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">請輸入密碼</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-4 py-2 rounded mb-2"
        />
        <button
          onClick={checkPassword}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          確認
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">任務管理</h1>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded shadow">
            <p className="text-lg font-medium">{task.content}</p>
            <p className="text-sm italic text-gray-600">{task.message}</p>
            <p className="text-sm text-gray-500">By {task.author}</p>
            <p className="text-sm text-gray-500">
              {task.drawn_at ? `✅ 已抽取於 ${new Date(task.drawn_at).toLocaleString()}` : "❌ 尚未抽取"}
            </p>
            <div className="flex gap-2 mt-2">
              {!task.drawn_at && (
                <button
                  onClick={() => markAsDrawn(task.id)}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  標記為已抽取
                </button>
              )}
              <button
                onClick={() => deleteTask(task.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                刪除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
