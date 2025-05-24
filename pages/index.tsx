// pages/index.tsx
export default function Home() {
  return (
    <div className="flex flex-col items-center gap-4">
      <a
        href="/draw"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        今天做什麼好呢~
      </a>
      <a
        href="/submit"
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        投稿任務
      </a>
      <a
        href="/history"
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        查看抽過的任務
      </a>
    </div>
  );
}
