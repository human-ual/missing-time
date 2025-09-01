"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const appleImages = [
  "/images/apple.png",
  "/images/apple-bitten1.png",
  "/images/apple-twoleaves.png",
  "/images/apple-worm.png",
  "/images/apple-sliced.png",
  "/images/apple-bitten2.png",
];

type Task = {
  id: number;
  content: string;
  author: string;
  message: string;
};

function fillToSix(tasks: Task[]): Task[] {
  const result: Task[] = [];
  if (tasks.length === 0) return result;
  while (result.length < 6) {
    const randomIndex = Math.floor(Math.random() * tasks.length);
    result.push(tasks[randomIndex]);
  }
  return result;
}

export default function PixelCardGrid() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [drawnTask, setDrawnTask] = useState<Task | null>(null);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [allowRepeat, setAllowRepeat] = useState(false);

  const loadRandomTasks = async () => {
    try {
      const res = await fetch("/api/sample-tasks?repeat=" + allowRepeat);
      const data = await res.json();
      if (!Array.isArray(data.tasks)) throw new Error("資料格式錯誤");
      const padded = fillToSix(data.tasks);
      setTasks(padded);
      setDrawnTask(null);
      setFlippedIndex(null);
    } catch (err) {
      console.error("❌ 無法載入任務", err);
      setTasks([]);
    }
  };

  useEffect(() => {
    loadRandomTasks();
  }, [allowRepeat]);

  const handleCardClick = async (index: number) => {
    if (flippedIndex !== null || loading) return;
    setFlippedIndex(index);
    setLoading(true);
    await new Promise((res) => setTimeout(res, 600));
    setDrawnTask(tasks[index]);
    setLoading(false);

   // fetch("/api/mark-drawn_at", {
    //  method: "POST",
    //  headers: { "Content-Type": "application/json" },
    //  body: JSON.stringify({ id: tasks[index].id }),
    //}).catch((err) => console.error("⚠️ 無法記錄抽取歷史", err));
  //};
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    await supabase
      .from("tasks")
      .update({ drawn_at: new Date().toISOString() })
      .eq("id", tasks[index].id)
      .then(({ error }) => {
        if (error) console.error("⚠️ 更新 drawn_at 失敗", error);
      });
    };

  return (
    <div className="bg-black min-h-screen w-full overflow-x-hidden flex flex-col items-center justify-start p-4 font-pixel text-white">
      <h1 className="text-xl mb-4">🎴 選一張卡片抽任務</h1>

      <label className="text-xs mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={allowRepeat}
          onChange={() => setAllowRepeat(!allowRepeat)}
        />
        允許重複抽到任務
      </label>

      <div className="flex flex-wrap gap-4 justify-center items-center w-full max-w-6xl">
        {tasks.map((task, i) => (
          <div
            key={i}
            onClick={() => handleCardClick(i)}
            className={`transition-all duration-500 relative border-4 border-white bg-black shadow-lg cursor-pointer flex items-center justify-center
              ${flippedIndex !== null && flippedIndex !== i ? "opacity-0 w-0 h-0 overflow-hidden" : "hover:scale-105"}
              ${flippedIndex === i ? "fixed inset-0 m-auto w-[90vw] max-w-md h-[80vh] z-10" : "w-40 h-56"}
            `}
          >
            {flippedIndex === i ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-sm text-center overflow-y-auto">
                <img
                  src={appleImages[i % appleImages.length]}
                  alt="apple-front"
                  className="w-20 h-20 mb-4"
                />
                <p className="text-base leading-relaxed whitespace-pre-wrap">{task.content}</p>
                <p className="text-base leading-relaxed whitespace-pre-wrap">{task.message}</p>
                <p className="text-[10px] mt-4">✏️ by {task.author}</p>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={appleImages[i % appleImages.length]}
                  alt="apple-back"
                  className="w-12 h-12"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {drawnTask && (
        <button
          onClick={loadRandomTasks}
          className="mt-8 px-6 py-3 bg-pink-300 text-black border-2 border-white rounded hover:scale-105 transition-transform"
        >
          🔁 再抽一次
        </button>
      )}
    </div>
  );
}
