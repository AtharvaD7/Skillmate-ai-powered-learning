"use client";
import React, { useState, useRef, useEffect } from "react";
import { MessageCircleQuestion, Trash2, X, SendHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

function FloatingChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const chatRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (chatRef.current && !chatRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Function to send user message (Stores but does NOT get a response)
    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]); // Show user input
        setInput("");

        try {
            await axios.post("/api/chat-user", { message: input }); // ✅ Store message, no response expected
        } catch (error) {
            console.error("Error storing message:", error);
        }
    };

    // Function to fetch all stored messages manually
    const getResponse = async () => {
        try {
            const response = await axios.get("/api/chat-user"); // ✅ Fetch stored messages
            setMessages(response.data.messages);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    // Function to clear chat messages
    const clearChat = () => {
        setMessages([]);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircleQuestion className="w-6 h-6" />}
            </Button>

            {isOpen && (
                <div
                    ref={chatRef}
                    className="w-80 h-96 bg-white shadow-lg rounded-lg border border-gray-200 mt-3 p-3 flex flex-col"
                >
                    <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-lg font-semibold">Ask AI</h2>
                        {messages.length > 0 && (
                            <Button variant="ghost" size="icon" onClick={clearChat}>
                                <Trash2 className="w-5 h-5 text-gray-500" />
                            </Button>
                        )}
                    </div>

                    {/* Chat Content Area (Hides Scrollbar) */}
                    <div className="flex-1 overflow-y-auto p-2 space-y-2 scrollbar-hide">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded-lg text-sm max-w-[75%] ${msg.role === "user"
                                        ? "bg-blue-500 text-white self-end text-right ml-auto"
                                        : "bg-gray-200 text-black self-start text-left mr-auto"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        ))}
                    </div>

                    {/* Input Field */}
                    <div className="border-t pt-2 flex">
                        <input
                            type="text"
                            placeholder="Ask me anything..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 p-2 border rounded-md focus:outline-none"
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <Button className="ml-2 bg-blue-600 text-white px-3" onClick={sendMessage}>
                            <SendHorizontal className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FloatingChatBot;
