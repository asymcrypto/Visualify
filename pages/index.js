import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";

export default function Home() {
  const [input, setInput] = useState("");
  const [previewText, setPreviewText] = useState("Paste a tweet or article link here and click Generate");
  const [credits, setCredits] = useState(3);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef(null);

  const consumeCredit = () => {
    if (credits <= 0) return false;
    setCredits(c => c - 1);
    return true;
  };

  const generatePreview = async () => {
    if (!input) {
      alert("Please paste a tweet or text");
      return;
    }
    if (!consumeCredit()) {
      alert("No credits left — wait for reset or buy more later.");
      return;
    }

    setLoading(true);
    try {
      let extracted = input;
      try {
        const url = new URL(input.startsWith("http") ? input : "http://" + input);
        extracted = decodeURIComponent(url.pathname.replace(/\//g, " ")).replace(/[-_]/g, " ");
        if (!extracted.trim()) extracted = url.hostname;
      } catch {
        extracted = input;
      }

      if (extracted.length > 240) extracted = extracted.slice(0, 237) + "...";
      setPreviewText(extracted);
      await new Promise(r => setTimeout(r, 600));
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async () => {
    if (!cardRef.current) return;
    setLoading(true);
    try {
      const canvas = await html2canvas(cardRef.current, { scale: 2 });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "visualify.png";
      link.click();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Visualify ⚡</h1>

        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={4}
          className="w-full p-3 bg-slate-800 rounded border border-slate-700 mb-4"
          placeholder="Paste your tweet or article link here"
        />

        <button
          onClick={generatePreview}
          disabled={loading}
          className="bg-emerald-500 text-slate-900 px-4 py-2 rounded font-bold mr-3"
        >
          {loading ? "Generating..." : "Generate"}
        </button>

        <button onClick={downloadImage} className="bg-slate-700 px-4 py-2 rounded">
          Download
        </button>

        <div className="mt-8" ref={cardRef}>
          <div className="p-6 bg-gradient-to-br from-indigo-600 to-pink-500 rounded-2xl shadow-2xl">
            <div className="text-xl font-bold mb-4">{previewText}</div>
            <div className="text-sm opacity-80">visualify.app • make words pop</div>
          </div>
        </div>
      </div>
    </div>
  );
}
