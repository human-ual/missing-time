import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DrawTaskPage() {
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [allowRepeat, setAllowRepeat] = useState(false);

  const drawTask = async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc("draw_random_task", {
      allow_repeat: allowRepeat,
    });
    if (error) {
      console.error(error);
      alert("發生錯誤，請稍後再試！");
    } else {
      setTask(data);
    }
    setLoading(false);
  };

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



