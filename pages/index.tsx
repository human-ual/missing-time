// pages/index.tsx
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-darkBg text-pixel p-6 space-y-8">
      <h1 className="text-4xl font-bold text-pacmanYellow drop-shadow-lg">Missing Time</h1>
      <p className="text-lg text-white">想念的時候就抽籤</p>
      <div className="flex flex-row gap-6 mt-4">
        <a
          href="/draw"
          className="bg-pacmanYellow text-darkBg font-bold py-3 px-6 rounded border-4 border-white hover:scale-105 transition-transform shadow-md"
        >
          🎲 今天做什麼好呢
        </a>
        <a
          href="/submit"
          className="bg-ghostPink text-white font-bold py-3 px-6 rounded border-4 border-white hover:scale-105 transition-transform shadow-md"
        >
          📝 投稿任務
        </a>
        <a
          href="/history"
          className="bg-ghostBlue text-white font-bold py-3 px-6 rounded border-4 border-white hover:scale-105 transition-transform shadow-md"
        >
          📜 查看抽過的任務
        </a>
      </div>
    </div>
  );
}
