// pages/index.tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-darkBg text-white font-pixel flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl mb-10">Missing Time</h1>

      <div className="flex flex-wrap gap-4 justify-center">
        <a
          href="/draw"
          className="px-4 py-3 bg-pacmanYellow text-darkBg rounded-none border-4 border-white shadow-lg hover:scale-105 transition-transform"
        >
          🎲 今天做什麼好呢
        </a>
        <a
          href="/submit"
          className="px-4 py-3 bg-ghostPink text-darkBg rounded-none border-4 border-white shadow-lg hover:scale-105 transition-transform"
        >
          📝 投稿任務
        </a>
        <a
          href="/history"
          className="px-4 py-3 bg-ghostBlue text-darkBg rounded-none border-4 border-white shadow-lg hover:scale-105 transition-transform"
        >
          📜 查看抽過的任務
        </a>
      </div>
    </div>
  );
}
