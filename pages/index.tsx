// pages/index.tsx
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 p-6 text-center">
      <h1 className="text-3xl font-bold">Missing Time</h1>
      <p className="text-lg">想念的時候就抽籤</p>
      <div className="flex gap-4">
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
      </div>
    </div>
  );
}
}
