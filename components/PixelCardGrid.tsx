"use client";
import { useEffect, useState } from "react";

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

  const loadRandomTasks = async () => {
    try {
      const res = await fetch("/api/sample-tasks");
      const data = await res.json();
      console.log("✅ 載入任務成功", data);
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
  }, []);

  const handleCardClick = async (index: number) => {
    if (flippedIndex !== null || loading) return;
    setFlippedIndex(index);
    setLoading(true);
    await new Promise((res) => setTimeout(res, 600)); // 模擬延遲動畫
    setDrawnTask(tasks[index]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center space-y-6 font-pixel p-4 text-white">
      <h1 className="text-xl flex items-center gap-2">🎴 選一張卡片抽任務</h1>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {tasks.map((task, i) => (
          <div
            key={i}
            onClick={() => handleCardClick(i)}
            className={`w-36 h-52 cursor-pointer transition-all duration-500 perspective-1000 relative 
              ${flippedIndex !== null && flippedIndex !== i ? "opacity-30 pointer-events-none" : ""}
              ${flippedIndex === null ? "hover:scale-105 animate-wiggle" : ""}
            `}
          >
            <div
              className="absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d"
              style={{
                transform: flippedIndex === i ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* 卡片背面 */}
              <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-yellow-300 text-black border-4 border-black shadow-pixel">
                🎲
              </div>

              {/* 卡片正面 */}
              <div className="absolute w-full h-full backface-hidden transform rotateY-180 flex items-center justify-center bg-green-800 text-white text-center border-4 border-black shadow-pixel text-xs p-2">
                {drawnTask && flippedIndex === i ? (
                  <div className="space-y-2">
                    <p>{drawnTask.content}</p>
                    <p className="text-[10px]">✏️ by {drawnTask.author}</p>
                  </div>
                ) : (
                  "抽取中..."
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {drawnTask && (
        <button
          onClick={loadRandomTasks}
          className="mt-6 px-6 py-3 bg-pink-300 text-black border-2 border-white rounded hover:scale-105 transition-transform"
        >
          🔁 再抽一次
        </button>
      )}
    </div>
  );
}
