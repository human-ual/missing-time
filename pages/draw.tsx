// pages/draw.tsx
import { useState } from "react";
import PixelCardGrid from "@/components/PixelCardGrid";

export default function DrawTaskPage() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const checkPassword = async () => {
    const res = await fetch("/api/verify-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthorized(true);
      setError("");
    } else {
      setError("密碼錯誤，請再試一次");
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-4 bg-black text-white font-pixel">
        <h1 className="text-2xl font-bold">🔐 <span className="zh">請輸入密碼</span></h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-4 py-2 rounded text-black"
        />
        <button
          onClick={checkPassword}
          className="px-4 py-2 bg-ghostBlue text-black rounded hover:scale-105 transition-transform border-2 border-white"
        >
          <span className="zh">確認</span>
        </button>
        {error && <p className="text-red-500 zh">{error}</p>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 font-['Press_Start_2P']">
      
      <PixelCardGrid />
    </div>
  );
}