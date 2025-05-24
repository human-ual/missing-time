// pages/index.tsx
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-darkBg text-white font-pixel space-y-8">
      <h1 className="text-5xl text-pacmanYellow animate-wiggle">★ Missing Time ★</h1>
      <div className="flex flex-col items-center space-y-6 text-xl">
        <a
          href="/draw"
          className="px-10 py-4 bg-pacmanYellow text-darkBg border-4 border-darkBg rounded shadow hover:scale-105 transition transform duration-150"
        >
          今天做什麼好呢★
        </a>
        <a
          href="/submit"
          className="px-10 py-4 bg-ghostPink text-darkBg border-4 border-darkBg rounded shadow hover:scale-105 transition transform duration-150"
        >
          投稿任務
        </a>
        <a
          href="/history"
          className="px-10 py-4 bg-ghostBlue text-darkBg border-4 border-darkBg rounded shadow hover:scale-105 transition transform duration-150"
        >
          查看抽過的任務
        </a>
      </div>
    </div>
  );
}
