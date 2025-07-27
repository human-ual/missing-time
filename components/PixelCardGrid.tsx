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
      if (Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      } else {
        console.error("⚠️ tasks 資料格式錯誤", data);
        setTasks([]); // 安全預設
      }
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
    const task = tasks[index];
    await new Promise((res) => setTimeout(res, 600));
    setDrawnTask(task);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {Array.isArray(tasks) &&
          tasks.map((task, i) => (
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
                {/* 卡牌背面 */}
                <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-yellow-300 text-black border-4 border-black shadow-pixel">
                  🎲
                </div>

                {/* 卡牌正面 */}
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
