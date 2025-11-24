"use client";

import { useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Download, Sparkles } from "lucide-react";
import { toPng } from 'html-to-image';

interface NameEntry {
    engName: string;
    korName: string;
    meaning: string;
    tags: string[];
}

interface NameCardProps {
    nameEntry: NameEntry;
}

export default function NameCard({ nameEntry }: NameCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handlePlayAudio = () => {
        if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(nameEntry.korName.split(" (")[0]);
            utterance.lang = "ko-KR";
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Sorry, your browser does not support text-to-speech.");
        }
    };

    const handleSaveImage = useCallback(async () => {
        if (cardRef.current === null) {
            return;
        }

        try {
            const dataUrl = await toPng(cardRef.current, { cacheBust: true });
            const link = document.createElement('a');
            link.download = `${nameEntry.engName}_Korean_Name.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to save image', err);
        }
    }, [cardRef, nameEntry.engName]);

    return (
        <div className="flex flex-col items-center space-y-8 w-full max-w-md">
            {/* Card Section */}
            <div
                ref={cardRef}
                className="w-full p-4 rounded-3xl shadow-xl"
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    backdropFilter: "blur(12px)",
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    borderWidth: "1px",
                    borderStyle: "solid"
                }}
            >
                <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        boxShadow: "none",
                        border: "none"
                    }}
                >
                    <div
                        className="h-3"
                        style={{ background: "linear-gradient(to right, #f9a8d4, #d8b4fe, #a5b4fc)" }}
                    />
                    <div className="text-center pt-10 pb-4 relative px-6">
                        <Sparkles
                            className="absolute top-4 right-4 w-5 h-5 opacity-80"
                            style={{ color: "#facc15" }}
                        />
                        <h2
                            className="text-5xl font-bold tracking-tight font-[family-name:var(--font-kor)]"
                            style={{ color: "#1f2937", margin: 0 }}
                        >
                            {nameEntry.korName.split(" (")[0]}
                        </h2>
                        <p
                            className="text-2xl font-serif italic mt-3 font-[family-name:var(--font-playfair)]"
                            style={{ color: "#4b5563" }}
                        >
                            {nameEntry.engName}
                        </p>
                        <button
                            onClick={handlePlayAudio}
                            className="absolute top-1/2 right-8 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            style={{ color: "#6b7280" }}
                            aria-label="Listen to pronunciation"
                            data-html2canvas-ignore="true"
                        >
                            <Volume2 className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="space-y-8 pb-12 px-8">
                        <div className="text-center space-y-3">
                            <h3
                                className="text-xs font-bold uppercase tracking-widest"
                                style={{ color: "#a855f7", margin: 0 }}
                            >
                                Meaning
                            </h3>
                            <p
                                className="text-xl font-medium leading-relaxed font-serif italic"
                                style={{ color: "#374151", margin: 0 }}
                            >
                                &quot;{nameEntry.meaning}&quot;
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center">
                            {nameEntry.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-semibold rounded-full shadow-sm"
                                    style={{
                                        backgroundColor: "#faf5ff",
                                        color: "#9333ea",
                                        borderColor: "#f3e8ff",
                                        borderWidth: "1px",
                                        borderStyle: "solid"
                                    }}
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <Button
                onClick={handleSaveImage}
                className="w-full max-w-xs bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-6 rounded-full shadow-lg transform transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
                <Download className="w-5 h-5" />
                Save as Image
            </Button>

            {/* SEO & Content Section */}
            <div className="text-center space-y-6 max-w-sm">
                <p className="text-gray-600 leading-relaxed">
                    <span className="font-serif font-bold text-gray-800">{nameEntry.engName}</span> means{" "}
                    <span className="italic">{nameEntry.meaning}</span>. In Korean,{" "}
                    <span className="font-bold text-purple-600">{nameEntry.korName.split(" (")[0]}</span> creates a specialized vibe that reflects your unique personality.
                </p>

                <div className="pt-4 border-t border-gray-200/50">
                    <a
                        href="#"
                        className="inline-block text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-80 transition-opacity uppercase tracking-wide border-b-2 border-pink-200 pb-0.5"
                    >
                        Get your Korean Name Necklace →
                    </a>
                </div>
            </div>
        </div>
    );
}
