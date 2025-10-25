import { useState, useRef } from "react";
import html2canvas from "html2canvas";

export default function Home() {
  const [text, setText] = useState("");
  const [generated, setGenerated] = useState(false);
  const visualRef = useRef(null);

  const handleGenerate = () => {
    if (text.trim() === "") return alert("Please enter some text!");
    setGenerated(true);
  };

  const handleDownload = async () => {
    const element = visualRef.current;
    const canvas = await html2canvas(element);
    const link = document.createElement("a");
    link.download = "visualify.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Visualify ✨ – Turn Words into Visuals
      </h1>

      {!generated ? (
        <div className="w-full max-w-md bg-gray-900 p-4 rounded-2xl shadow-xl">
          <textarea
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white outline-none resize-none"
            rows="5"
            placeholder="Paste your tweet, blog snippet, or idea..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={handleGenerate}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold"
          >
            Generate Visual
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div
            ref={visualRef}
            className="w-[360px] p-6 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-2xl text-white text-center relative"
          >
            <p className="text-lg whitespace-pre-line">{text}</p>
            <div className="absolute bottom-2 right-3 text-xs text-gray-200">
              ⚙️ Built by GitForge
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <button
              onClick={() => setGenerated(false)}
              className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-lg"
            >
              Edit
            </button>
            <button
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
            >
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
    }
