// pages/draw.tsx
import { useState } from "react";

export default function DrawTaskPage() {
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [allowRepeat, setAllowRepeat] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const checkPassword = async () => {
    const res = await fetch("/api/verify-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthorized(true);
      setError("");
    } else {
      setError("密碼錯誤，請再試一次");
    }
  };

  const drawTask = async () => {
    setLoading(true);
    const res = await fetch("/api/draw-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ allowRepeat }),
    });
    const result = await res.json();
    setLoading(false);
    if (res.ok) {
      setTask(result.task);
    } else {
      console.error(result.error);
      alert("發生錯誤，請稍後再試！");
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-4">
        <h1 className="text-2xl font-bold">請輸入密碼</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-4 py-2 rounded"
        />
        <button
          onClick={checkPassword}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          確認
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
      <h1 className="text-3xl font-bold"> Missing Time</h1>
      <button
        onClick={drawTask}
        disabled={loading}
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        {loading ? "抽取中..." : "抽一個任務吧"}
      </button>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={allowRepeat}
          onChange={(e) => setAllowRepeat(e.target.checked)}
        />
        <span>允許重複抽取</span>
      </label>
      {task && (
        <div className="max-w-lg w-full p-4 border rounded shadow space-y-2 bg-white">
          <p className="text-xl font-medium">{task.content}</p>
          <p className="text-sm italic text-gray-700">{task.message}</p>
          <p className="text-right text-sm text-gray-500">— {task.author}</p>
        </div>
      )}
    </div>
  );
}




