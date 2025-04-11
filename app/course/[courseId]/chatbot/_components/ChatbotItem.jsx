"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Trash2, SendHorizontal, LoaderCircle } from "lucide-react";
import Image from "next/image";

const ChatbotItem = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const savedChat = sessionStorage.getItem("chatHistory");
    if (savedChat) {
      setChatHistory(JSON.parse(savedChat));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: "user", text: inputMessage };
    setChatHistory((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post("/api/chat-user", { message: inputMessage });
      const botMessage = response.data;
      setChatHistory((prev) => [
        ...prev,
        { ...botMessage, formattedText: formatResponse(botMessage.text) },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setChatHistory([]);
    sessionStorage.removeItem("chatHistory");
  };

  const formatResponse = (text) => {
    text = text.replace(/<a\s+href=["'][^"']*["'][^>]*>(.*?)<\/a>/gi, '<span class="text-blue-600 underline cursor-default">$1</span>');
    text = text.replace(/<button[^>]*>(.*?)<\/button>/gi, '<span class="px-3 py-1 bg-gray-300 rounded-lg cursor-default">$1</span>');
    text = text.replace(/<input[^>]*>/gi, '<span class="bg-gray-200 px-2 py-1 border border-gray-400 rounded-lg cursor-default">[input]</span>');
    text = text.replace(/<textarea[^>]*>(.*?)<\/textarea>/gi, '<span class="bg-gray-200 p-2 border border-gray-400 rounded-lg block w-full cursor-default">[textarea]</span>');
    text = text.replace(/<select[^>]*>(.*?)<\/select>/gi, '<span class="bg-gray-200 px-2 py-1 border border-gray-400 rounded-lg cursor-default">[dropdown]</span>');
    text = text.replace(/<form[^>]*>(.*?)<\/form>/gis, '<div class="bg-gray-100 p-2 rounded-lg">$1</div>');

    text = text.replace(/```([\s\S]*?)```/g, (_, code) => {
      const escaped = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return `<pre class="bg-gray-800 text-white p-2 rounded-md overflow-x-auto text-sm"><code>${escaped}</code></pre>`;
    });


    text = text.replace(/`([^`]+)`/g, '<code class="bg-gray-200 text-black px-1 py-0.5 rounded text-sm">$1</code>');
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-600">$1</strong>');
    text = text.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

    text = text.replace(/(?:^|\n)([-*])\s+(.*)/g, (match, bullet, item) => {
      if (!/^\d+\./.test(item.trim())) {
        return `\n<ul class="list-disc ml-6"><li>${item.trim()}</li></ul>`;
      }
      return match;
    });

    text = text.replace(/(?:^|\n)((?:\d+\.\s+.*(?:\n|$))+)/g, (_, listBlock) => {
      const items = listBlock
        .trim()
        .split('\n')
        .map(line => {
          const match = line.match(/^\d+\.\s+(.*)/);
          return match ? `  <li>${match[1]}</li>` : '';
        })
        .join('\n');
      return `<ol class="list-decimal ml-6">\n${items}\n</ol>`;
    });

    text = text.replace(/\n/g, "<br>");
    text = text.replace(/(<\/(ul|ol|pre|div|p)>)<br>/g, '$1');
    text = text.replace(/(<br\s*\/?>){2,}/g, '<br>');
    text = text.replace(/<br>\s*(<ul|<ol)/g, '$1');
    text = text.replace(/(<\/ul>|<\/ol>)\s*<br>/g, '$1');

    return text;
  };

  return (
    <>
      <h1 className="text-center text-2xl font-semibold text-gray-900 mt-10 flex justify-center items-center">
        Ask AI
        <Image src="/bot-message-square.svg" alt="Bot Icon" width={24} height={24} className="ml-2" />
      </h1>

      <div
        ref={chatContainerRef}
        className="mt-6 p-4 w-full"
        style={{
          paddingBottom: "150px", // Make sure this is taller than your fixed input
        }}
      >
        {chatHistory.length === 0 ? (
          <p className="text-center text-gray-500">Start a conversation!</p>
        ) : (
          chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`w-full px-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`my-2 rounded-2xl break-words leading-relaxed ${msg.role === "user"
                  ? "bg-[#4A90E2] text-white"
                  : "bg-gray-200 text-black"
                  }`}
                style={{
                  marginLeft: msg.role === "bot" ? "1%" : "auto",
                  marginRight: msg.role === "user" ? "0%" : "auto",
                  display: "inline-block",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  fontSize: msg.role === "bot" ? "16px" : "14px",
                  maxWidth: "75%",
                  minWidth: "fit-content",
                  padding: "10px 15px",
                }}
                dangerouslySetInnerHTML={
                  msg.role === "bot"
                    ? { __html: `<div class="space-y-2">${msg.formattedText}</div>` }
                    : { __html: msg.text }
                }
              />
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex justify-center items-center p-4">
            <LoaderCircle className="animate-spin text-gray-500" size={24} />
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-3 flex items-center justify-center">
        <div className="flex items-center space-x-3 w-[45%]">
          <button
            onClick={clearChat}
            className="text-gray-600 hover:text-gray-900 relative group"
          >
            <Trash2 size={20} />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Clear chat
            </span>
          </button>
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="p-3 bg-transparent text-black border border-gray-300 rounded-full focus:outline-none w-full text-left resize-none"
            placeholder="Type a message..."
            rows={1}
          />
          <button
            onClick={sendMessage}
            className="bg-[#4A90E2] text-white px-4 py-3 rounded-full hover:bg-[#357ABD] flex items-center relative group"
          >
            <SendHorizontal size={20} />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Send
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatbotItem;
