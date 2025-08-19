"use client";
import { useState,useEffect} from "react";
import { motion } from "motion/react";

export default function Home() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setReply("");
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setReply(data.reply);
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6 border border-white/30"
      >
        <h1 className="text-3xl font-extrabold text-white drop-shadow-lg text-center">
          Gemini Chat 🚀
        </h1>

        {/* Input Area */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask  Something..."
          className="border border-white/40 bg-white/30 placeholder-gray-200 text-white rounded-xl w-full h-28 p-4 focus:ring-2 focus:ring-yellow-400 outline-none resize-none"
        />

        {/* Send Button */}
        <motion.button
          onClick={sendMessage}
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="w-full bg-yellow-400 text-black font-semibold px-4 py-3 rounded-xl shadow-lg hover:bg-yellow-300 transition disabled:opacity-60"
        >
          {loading ? "Thinking..." : "✨Send"}
        </motion.button>

        {/* Reply Box */}
        {reply && (
          <motion.div
            key="reply-box"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 bg-white/30 text-white rounded-xl p-6 shadow-inner border border-white/40 whitespace-pre-wrap"
          >
            <h2 className="font-bold text-lg mb-2">Gemini says:</h2>
            <TypingEffect text={reply} />
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}


function TypingEffect({ text }) {
  const [displayed, setDisplayed] = useState("");

useEffect(() => {
    if (!text) return; // Only run when we actually get text
    setDisplayed(""); 
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval); // Cleanup
  }, [text]);

  return <p className="leading-relaxed">{displayed}</p>;
}




