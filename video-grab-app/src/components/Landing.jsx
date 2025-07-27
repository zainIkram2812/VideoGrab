import React, { useState, useEffect, useRef } from "react";

const Landing = () => {
  const [url, setUrl] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      alert("Clipboard access denied.");
    }
  };

  const handleDownload = () => {
    console.log("Download clicked for:", url);
    // @Akber will hook this to backend later
  };

  return (
    <section className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50 min-h-[calc(100vh-80px)]">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
        Paste a link. Download your video.
      </h2>
      <p className="text-gray-500 text-lg mb-8">
        Supports YouTube, TikTok, Instagram & more.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl">
        <input
          ref={inputRef}
          type="text"
          placeholder="https://example.com/video"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-md shadow-sm w-full sm:w-auto"
        />
        <button
          onClick={handlePaste}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
        >
          Paste
        </button>
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Download
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-400">
        No sign-up required. No watermark (Pro).
      </p>
    </section>
  );
};

export default Landing;
