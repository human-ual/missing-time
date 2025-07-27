"use client";
import { useEffect, useState } from "react";

const appleImages = [
  "/images/apple-normal.png",
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
};

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
      setTasks(data.tasks);
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
  };

  return (
    <div className="bg-black h-screen overflow-hidden flex flex-col items-center justify-center p-4 font-pixel text-white">
      <h1 className="text-xl mb-4">🎴 選一張卡片抽任務</h1>

      <label className="text-xs mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={allowRepeat}
          onChange={() => setAllowRepeat(!allowRepeat)}
        />
        允許重複抽到任務
      </label>

      <div className={`flex gap-4 transition-all duration-700 ${flippedIndex !== null ? "justify-center" : "flex-wrap justify-center"} items-center w-full max-w-screen-lg`}>
        {tasks.map((task, i) => (
          <div
            key={i}
            onClick={() => handleCardClick(i)}
            className={`transition-all duration-500 relative border-4 border-white bg-black shadow-lg cursor-pointer
              ${flippedIndex !== null && flippedIndex !== i ? "opacity-0 w-0 h-0 overflow-hidden" : "hover:scale-105"}
              ${flippedIndex === i ? "w-[80vw] h-[65vh] scale-100 z-10" : "w-44 h-60"}
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
