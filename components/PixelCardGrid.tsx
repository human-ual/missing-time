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

  // 🚀 頁面載入時預先從 API 拿出 6 筆任務作為選項
  const loadRandomTasks = async () => {
    const res = await fetch("/api/sample-tasks"); // 你需要建立這個 API
    const data = await res.json();
    setTasks(data.tasks); // 6 筆隨機任務
    setDrawnTask(null);
    setFlippedIndex(null);
  };

  useEffect(() => {
    loadRandomTasks();
  }, []);

  const handleCardClick = async (index: number) => {
    if (flippedIndex !== null || loading) return;
    setFlippedIndex(index);
    setLoading(true);

    // 模擬抽出，實際上只是顯示第 index 張任務
    const task = tasks[index];
    await new Promise((res) => setTimeout(res, 600)); // 模擬延遲動畫
    setDrawnTask(task);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {tasks.map((task, i) => (
          <div
            key={i}
            className={`w-36 h-52 cursor-pointer transition-transform transform perspective-1000
              ${flippedIndex !== null && flippedIndex !== i ? "opacity-30 pointer-events-none" : ""}
              ${flippedIndex === null ? "hover:scale-105 animate-wiggle" : ""}
            `}
            onClick={() => handleCardClick(i)}
          >
            <div
              className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d"
              style={{
                transform: flippedIndex === i ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* 背面（未翻開） */}
              <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-yellow-300 text-black border-4 border-black shadow-pixel">
                🎲
              </div>

              {/* 正面（翻開） */}
              <div className="absolute w-full h-full backface-hidden transform rotateY-180 flex items-center justify-center bg-green-700 border-4 border-black shadow-inner shadow-pixel text-sm p-2">
                {drawnTask && flippedIndex === i ? (
                  <div className="text-center space-y-2">
                    <p>{drawnTask.content}</p>
                    <p className="text-xs">✏️ by {drawnTask.author}</p>
                  </div>
                ) : (
                  "抽取中..."
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 再抽一次按鈕 */}
      {drawnTask && (
        <button
          onClick={loadRandomTasks}
          className="mt-6 px-6 py-3 bg-ghostPink text-black border-2 border-white rounded hover:scale-105 transition-transform"
        >
          🔁 再抽一次
        </button>
      )}
    </div>
  );
}
