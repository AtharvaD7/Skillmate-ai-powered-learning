"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FlashcardItem from "./_components/FlashcardItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Flashcards() {
  const { courseId } = useParams();
  const router = useRouter();
  const [flashCards, setFlashCards] = useState([]);
  const [api, setApi] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (courseId) {
      GetFlashcards();
    }
  }, [courseId]);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setFlashCards((prev) =>
        prev.map((card) => ({ ...card, isFlipped: false }))
      );
    });
  }, [api]);

  const GetFlashcards = async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "Flashcard",
      });

      const flashcardData =
        result?.data?.content?.map((card) => ({ ...card, isFlipped: false })) ||
        [];

      setFlashCards(flashcardData);
    } catch (err) {
      console.error("Error fetching flashcards:", err);
      setError(true);
    }
    setLoading(false);
  };

  const handleClick = (index) => {
    setFlashCards((prev) =>
      prev.map((card, i) =>
        i === index ? { ...card, isFlipped: !card.isFlipped } : card
      )
    );
  };

  return (
    <div>
      <h2 className="flex items-center justify-center font-bold text-2xl">
        Flashcards
      </h2>
      <p className="text-center">
        Flashcards : The Ultimate Tool to Lock in Concepts!
      </p>

      {loading ? (
        <div className="text-center mt-10 text-lg">Loading flashcards...</div>
      ) : error ? (
        <div className="text-center mt-10 text-lg text-red-600">
          Failed to load flashcards. Try again.
        </div>
      ) : flashCards.length === 0 ? (
        <div className="text-center mt-10 text-lg  ">
          No flashcards available.
        </div>
      ) : (
        <>
          <div className="flex justify-center w-full mt-11">
            <Carousel className="relative w-[90%] md:w-[60%] mx-auto" setApi={setApi}>
              <CarouselContent>
                {flashCards.map((flashcard, index) => (
                  <CarouselItem
                    key={index}
                    className="flex items-center justify-center"
                  >
                    <FlashcardItem
                      handleClick={() => handleClick(index)}
                      isFlipped={flashcard.isFlipped}
                      flashcard={flashcard}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2" />
              <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2" />
            </Carousel>
          </div>
        </>
      )}

      {/* Refresh Button When No Flashcards */}
      {!loading && flashCards.length === 0 && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={GetFlashcards}
          >
            Refresh
          </button>
        </div>
      )}

      {/* Back to Course Button */}
      <div className="flex justify-center mt-24">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => router.push(`/course/${courseId}`)}
        >
          Back to Course
        </button>
      </div>
    </div>
  );
}

export default Flashcards;
