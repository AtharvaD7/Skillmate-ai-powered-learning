"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { ArrowRight, Brain, BookOpen, ClipboardList } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [tiltY, setTiltY] = useState(0);
  const featureRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const handleButtonClick = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const tiltAmount = Math.min(scrollY / 15, 10);
    setTiltY(-tiltAmount);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (featureRef.current) {
      observer.observe(featureRef.current);
    }

    return () => {
      if (featureRef.current) {
        observer.unobserve(featureRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative overflow-hidden">

      {/* Navbar */}
      <header className="w-full flex justify-between items-center p-5 bg-white shadow-md fixed top-0 z-10">
        <div className="flex items-center gap-2">
          <Image src='/cleanlogo.svg' alt='logo' width={40} height={40} priority />
          <h2 className="text-2xl font-bold">SkillMate</h2>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link href="/sign-in">
              <Button variant="outline">Sign In / Sign Up</Button>
            </Link>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center text-center mt-32 px-5">
        <h1 className="text-4xl font-bold text-center relative mt-12"> {/* Added margin-top for gap */}
          AI-Aided <span className="text-blue-700">Preparation Content</span> Generator
          <Image src="/code.png" alt="coding" width={60} height={60} className="absolute left-[-110px] top-[-50px] rotate-[-15deg] opacity-80" />
          <Image src="/knowledge.png" alt="knowledge" width={60} height={60} className="absolute right-[-110px] top-[-50px] rotate-[15deg] opacity-80" />
        </h1>
        <p className="mt-2 text-gray-600 text-center">
          Personalized study materials tailored for coding and skill development,
        </p>
        <p className="text-gray-600 text-center">
          extending to various other domains beyond just these.
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-6 flex gap-4">
          <Button onClick={handleButtonClick} className="flex items-center text-lg px-5 py-3">
            Let’s Go <ArrowRight className="ml-2" />
          </Button>
          <Button variant="outline">Know More</Button>
        </div>
      </section>

      {/* Floating Image Section with Tilt Effect */}
      <section className="w-full flex justify-center my-16">
        <div
          className="w-3/4 max-w-2xl rounded-lg shadow-lg overflow-hidden"
          style={{
            transform: `perspective(1000px) rotateX(${tiltY}deg)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <Image
            src="/hero1.jpeg"
            alt="Demo Preview"
            width={640}
            height={480}
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Feature Section with Scroll Animation and Shadow Enhancement */}
      <section
        ref={featureRef}
        className={`w-full max-w-6xl mx-auto mt-16 px-5 transition-all duration-700 ease-in-out ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
      >
        <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col items-center p-6 bg-white shadow-2xl rounded-lg">
            <Brain className="w-12 h-12 text-blue-700" />
            <h3 className="text-lg font-semibold mt-3">AI-Driven Learning</h3>
            <p className="text-gray-600 text-center">Personalized content recommendations using AI.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white shadow-2xl rounded-lg">
            <BookOpen className="w-12 h-12 text-blue-700" />
            <h3 className="text-lg font-semibold mt-3">Comprehensive Resources</h3>
            <p className="text-gray-600 text-center">Access study guides, tutorials, and documentation.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white shadow-2xl rounded-lg">
            <ClipboardList className="w-12 h-12 text-blue-700" />
            <h3 className="text-lg font-semibold mt-3">Flashcards & Quizzes</h3>
            <p className="text-gray-600 text-center">AI-generated flashcards and quizzes for quick revision.</p>
          </div>
        </div>
      </section>

      {/* Handshake Section */}
      <section className="w-full flex flex-col items-center mt-24 mb-20 px-5 relative space-y-8">
        <Image
          src="/handshake.png"
          alt="Partnership & Growth"
          width={250}
          height={250}
          className="opacity-30"
        />
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-4">
          Empowering Learning Through AI
        </h3>
        <p className="text-gray-600 text-center max-w-3xl leading-relaxed">
          SkillMate leverages AI to generate personalized study materials, flashcards, and quizzes,
          helping users enhance their coding skills and efficiently prepare for technical interviews.
          Collaborate with peers, access simplified comprehensive resources, and track your learning progress seamlessly.
        </p>
      </section>

    </div>
  );
}
