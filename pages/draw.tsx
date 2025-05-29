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
      <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-4 bg-black text-white font-pixel">
        <h1 className="text-2xl font-bold">🔐 <span className="zh">請輸入密碼</span></h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-4 py-2 rounded text-black"
        />
        <button
          onClick={checkPassword}
          className="px-4 py-2 bg-ghostBlue text-black rounded hover:scale-105 transition-transform border-2 border-white"
        >
          <span className="zh">確認</span>
        </button>
        {error && <p className="text-red-500 zh">{error}</p>}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-6 flex flex-col items-center justify-center bg-black text-white font-pixel">
      <h1 className="text-3xl font-bold">🎯 <span className="zh">抽出一個任務！</span></h1>

      <label className="flex items-center gap-2 text-white">
        <input
          type="checkbox"
          checked={allowRepeat}
          onChange={(e) => setAllowRepeat(e.target.checked)}
        />
        <span className="zh">允許重複任務</span>
      </label>

      <button
        onClick={drawTask}
        disabled={loading}
        className="px-6 py-3 bg-ghostPink text-black rounded border-2 border-white hover:scale-105 transition-transform"
      >
        <span className="zh">{loading ? "抽取中..." : "抽一個"}</span>
      </button>

      {task && (
        <div className="bg-white shadow p-4 rounded max-w-md w-full text-center text-black">
          <p className="text-xl font-medium mb-2 zh">{task.content}</p>
          <p className="text-sm italic text-gray-600 mb-1 zh">{task.message}</p>
          <p className="text-sm text-gray-500 text-right zh">— {task.author}</p>
        </div>
      )}
    </div>
  );
}
