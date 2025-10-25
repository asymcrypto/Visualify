import { useState, useRef } from "react";
import html2canvas from "html2canvas";

export default function Home() {
  const [text, setText] = useState("");
  const captureRef = useRef(null);

  const handleGenerate = () => {
    if (!text.trim()) return alert("Paste your tweet or text first!");
  };

  const handleDownload = async () => {
    const element = captureRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const link = document.createElement("a");
    link.download = "visualify-by-gitforge.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 p-4">
      <h1 className="text-4xl font-bold mb-4">
        Visualify <span className="text-yellow-500">⚡</span>
      </h1>

      <textarea
        placeholder="Paste your tweet or article text here..."
        className="border w-full max-w-md h-24 p-3 rounded-md mb-3 outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex gap-3 mb-6">
        <button
          onClick={handleGenerate}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Generate
        </button>
        <button
          onClick={handleDownload}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg"
        >
          Download
        </button>
      </div>

      {/* Visual Output */}
      <div
        ref={captureRef}
        className="bg-white p-6 rounded-xl shadow-md text-center max-w-md w-full"
      >
        <p className="text-lg whitespace-pre-line">{text || "Your visual will appear here..."}</p>
        <div className="text-sm text-gray-500 mt-4">
          visualify.app • Built by GitForge ⚙️
        </div>
      </div>
    </div>
  );
            }
