// pages/history.tsx
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Task = {
  id: number;
  content: string;
  author: string;
  message: string;
  drawn_at: string;
};

export default function HistoryPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .not("drawn_at", "is", null)
        .order("drawn_at", { ascending: false });

      if (!error && data) {
        setTasks(data);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-center">已抽取的任務</h1>
      <div className="space-y-4 max-w-3xl mx-auto">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded shadow">
            <p className="text-lg font-medium">{task.content}</p>
            <p className="text-sm italic text-gray-600">{task.message}</p>
            <div className="text-sm text-right text-gray-500">
              <p>— {task.author}</p>
              <p>{new Date(task.drawn_at).toLocaleString()}</p>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <p className="text-center text-gray-500">目前尚未抽取任何任務。</p>
        )}
      </div>
    </div>
  );
}

