"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function ViewNotes() {
    const { courseId } = useParams();
    const [notes, setNotes] = useState([]);
    const [stepCount, setStepCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(true);
    const route = useRouter();

    useEffect(() => {
        GetNotes();
    }, []);

    const GetNotes = async () => {
        try {
            setLoading(true);
            const result = await axios.post("/api/study-type", {
                courseId: courseId,
                studyType: "notes",
            });

            const sortedNotes = result?.data?.sort((a, b) => a.chapterNumber - b.chapterNumber) || [];
            setNotes(sortedNotes);
        } catch (error) {
            console.error("Error fetching notes:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatContent = (content) => {
        return content
            .replaceAll("```html", "")
            .replaceAll("```", "")
            .replaceAll(/<pre>([\s\S]*?)<\/pre>/g, (match, innerCode) => {
                return `<pre class="bg-neutral-800 text-white p-4 rounded-lg max-w-full break-words whitespace-pre-wrap overflow-auto">${innerCode
                    .replaceAll("&lt;", "<")
                    .replaceAll("&gt;", ">")
                    .replaceAll(";", ";\n")
                    .replaceAll("{", "{\n")
                    .replaceAll("}", "\n}")
                    .replaceAll("<<", "&lt;&lt;")
                    }</pre>`;
            })
            .replace(/<h2>/g, '<h2 class="font-bold text-xl mt-4 mb-2">')
            .replace(/<h3>/g, '<h3 class="text-blue-700 font-bold mt-3 mb-1">')
            .replace(/<p><strong>Chapter Summary:<\/strong><\/p>/g, '<p class="text-neutral-600 font-semibold mt-4">Chapter Summary:</p>')
            .replace(/<strong>/g, '<strong class="text-neutral-800">')
            .replace(/<ul>/g, '<div class="mt-3 mb-3"><ul class="list-disc pl-6"></div>')
            .replace(/<ol>/g, '<div class="mt-3 mb-3"><ol class="list-decimal pl-6"></div>')
            .replace(/<li>/g, '<li class="mb-2">');
    };

    if (loading) {
        return (
            <div className="w-full flex flex-col items-center space-y-8 mt-6 px-4">
                <p className="text-lg font-semibold text-gray-600">Loading notes...</p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col items-center space-y-8 mt-6 px-4 relative">
            {showAlert && (
                <div className="w-full max-w-sm bg-yellow-100 border border-yellow-200 text-yellow-800 p-2 rounded-md flex justify-between items-start text-xs gap-3">
                    <div className="flex items-start gap-2">
                        <span className="text-yellow-800 text-2xl">⚠️</span>
                        <p className="text-left text-sm leading-snug">
                            Please refresh the page periodically, as it may take some time to generate the content.
                        </p>
                    </div>
                    <button
                        className="mt-1 bg-red-700 text-white font-bold text-xs px-2 py-1 rounded-md border border-red-700 hover:bg-red-800 transition"
                        onClick={() => setShowAlert(false)}
                    >
                        ✕
                    </button>
                </div>
            )}

            <div className="flex gap-5 items-center">
                {stepCount !== 0 && (
                    <Button variant="outline" size="sm" onClick={() => setStepCount(stepCount - 1)}>
                        Previous
                    </Button>
                )}
                <div className="flex gap-2">
                    {notes?.map((_, index) => (
                        <div key={index} className={`w-10 h-2 rounded-full ${index < stepCount ? "bg-blue-700" : "bg-gray-200"}`}></div>
                    ))}
                </div>
                {stepCount < notes.length && (
                    <Button variant="outline" size="sm" onClick={() => setStepCount(stepCount + 1)}>
                        Next
                    </Button>
                )}
            </div>

            {stepCount < notes.length && (
                <div className="w-full max-w-3xl bg-gray-100 p-6 rounded-lg shadow-md">
                    <div
                        className="answer-content space-y-4"
                        style={{
                            wordBreak: "break-word",
                            overflowWrap: "anywhere",
                            whiteSpace: "pre-wrap",
                        }}
                        dangerouslySetInnerHTML={{
                            __html: formatContent(notes[stepCount]?.notes || ""),
                        }}
                    />
                </div>
            )}

            {stepCount === notes.length && (
                <div className="w-full flex flex-col items-center gap-6 mt-6">
                    <h2 className="text-xl font-semibold">End of Notes</h2>
                    <Button onClick={() => route.back()}>Go to Course Page</Button>
                </div>
            )}

            {/* Floating Ask AI Button */}
            <div className="fixed bottom-6 right-6 z-50 group">
                <button
                    onClick={() => route.push(`/course/${courseId}/chatbot`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition duration-300 flex items-center justify-center"
                >
                    <Image src="/bot-message-square.svg" alt="Ask AI" width={24} height={24} />
                </button>
                <div className="mb-1 opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-14 right-1/2 translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    Ask AI
                </div>
            </div>
        </div>
    );


}

export default ViewNotes;
