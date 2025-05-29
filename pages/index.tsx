export default function Home() {
  return (
    <div className="min-h-screen bg-darkBg text-white font-pixel flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl mb-4">Missing Time</h1>

      <p className="text-sm mb-10 text-center text-white/80">
        A little mission to do whenever I miss you
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <a
          href="/draw"
          className="px-4 py-3 bg-pacmanYellow text-darkBg rounded-none border-4 border-white shadow-lg hover:scale-105 transition-transform"
        >
          🎲 <span className="zh">今天做什麼好呢</span>
        </a>
        <a
          href="/submit"
          className="px-4 py-3 bg-ghostPink text-darkBg rounded-none border-4 border-white shadow-lg hover:scale-105 transition-transform"
        >
          📝 <span className="zh">發送任務</span>
        </a>
        <a
          href="/history"
          className="px-4 py-3 bg-ghostBlue text-darkBg rounded-none border-4 border-white shadow-lg hover:scale-105 transition-transform"
        >
          📜 <span className="zh">回頭看成就</span>
        </a>
      </div>
    </div>
  );
}
