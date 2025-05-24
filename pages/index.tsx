// pages/index.tsx
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-darkBg text-pixel text-center p-6">
      <h1 className="text-5xl font-bold text-pacmanYellow mb-8 tracking-widest">Missing Time</h1>
      <p className="text-xl text-white mb-10">想念的時候就抽籤</p>
      <div className="flex flex-row gap-4">
        <a
          href="/draw"
          className="px-6 py-3 bg-pacmanYellow text-darkBg font-bold rounded hover:scale-105 transition-transform"
        >
          🎲 今天做什麼好呢
        </a>
        <a
          href="/submit"
          className="px-6 py-3 bg-ghostRed text-white font-bold rounded hover:scale-105 transition-transform"
        >
          📝 投稿任務
        </a>
        <a
          href="/history"
          className="px-6 py-3 bg-ghostBlue text-white font-bold rounded hover:scale-105 transition-transform"
        >
          📜 查看抽過的任務
        </a>
      </div>
    </div>
  );
}
