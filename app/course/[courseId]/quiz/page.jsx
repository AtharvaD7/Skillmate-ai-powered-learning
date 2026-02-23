"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import StepProgress from "../_components/StepProgress";
import QuizCardItem from "./_components/QuizCardItem";

function Quiz() {
    const { courseId } = useParams();
    const router = useRouter();
    const [stepCount, setStepCount] = useState(0);
    const [isCorrectAns, setIsCorrectAnswer] = useState(null);
    const [quiz, setQuiz] = useState([]);
    const [correctAns, setCorrectAns] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState(""); 
    const [loading, setLoading] = useState(true);
    const [answered, setAnswered] = useState(false);

    useEffect(() => {
        if (courseId) GetQuiz();
    }, [courseId]);

    const GetQuiz = async () => {
        setLoading(true);
        try {
            const result = await axios.post("/api/study-type", {
                courseId: courseId,
                studyType: "Quiz",
            });

            setQuiz(result.data?.content?.questions || []);
        } catch (error) {
            console.error("Error fetching quiz data:", error);
        } finally {
            setLoading(false);
        }
    };

    const checkAnswer = (userAnswer, currentQuestion) => {
        setAnswered(true);
        setSelectedAnswer(userAnswer);

        if (userAnswer === currentQuestion?.correctAnswer || userAnswer === currentQuestion?.answer) {
            setIsCorrectAnswer(true);
            setCorrectAns(currentQuestion?.correctAnswer || currentQuestion?.answer);
        } else {
            setIsCorrectAnswer(false);
            setCorrectAns(currentQuestion?.correctAnswer || currentQuestion?.answer);
        }
    };

    useEffect(() => {
        setCorrectAns("");
        setSelectedAnswer("");
        setIsCorrectAnswer(null);
        setAnswered(false);
    }, [stepCount]);

    return (
        <div>
            <h2 className="text-center mb-4 font-bold text-2xl">Quiz</h2>

            {loading ? (
                <p className="text-center text-gray-500">Loading quiz...</p>
            ) : quiz.length === 0 ? (
                <div className="text-center mt-10">
                    <p className="text-gray-500">No quiz questions available.</p>
                    <button
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        onClick={GetQuiz}
                    >
                        Refresh
                    </button>
                </div>
            ) : (
                <>
                    <StepProgress data={quiz} stepCount={stepCount} setStepCount={setStepCount} />

                    {stepCount < quiz.length ? (
                        <QuizCardItem
                            quiz={quiz[stepCount]}
                            userSelectedOption={(v) => checkAnswer(v, quiz[stepCount])}
                        />
                    ) : (
                        <div className="text-center mt-16">
                            <h2 className="text-xl">End of Quiz</h2>
                            <button
                                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                onClick={() => router.push(`/course/${courseId}`)}
                            >
                                Back to Course
                            </button>
                        </div>
                    )}

                    {answered && (
                        <div className="flex justify-center mt-4">
                            <div className={`w-200 text-center border p-3 rounded-lg ${isCorrectAns ? "border-green-700 bg-green-200" : "border-red-700 bg-red-200"}`}>
                                <h2 className={`font-bold text-lg ${isCorrectAns ? "text-green-600" : "text-red-600"}`}>
                                    {isCorrectAns ? "Well done!" : "Incorrect"}
                                </h2>
                                <p className={`${isCorrectAns ? "text-green-600" : "text-red-600"}`}>
                                    Your answer: <strong>{selectedAnswer}</strong>
                                </p>
                                {!isCorrectAns && (
                                    <p className="text-red-600">
                                        Correct answer: <strong>{correctAns}</strong>
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {stepCount < quiz.length && (
                        <div className="flex justify-center mt-6">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                onClick={() => setStepCount(stepCount + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Quiz;
