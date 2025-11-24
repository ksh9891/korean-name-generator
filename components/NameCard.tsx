"use client";

import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Download, Sparkles } from "lucide-react";
import html2canvas from "html2canvas";

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

    const handleSaveImage = async () => {
        if (cardRef.current) {
            try {
                const canvas = await html2canvas(cardRef.current, {
                    backgroundColor: null, // Transparent background
                    scale: 2, // Higher resolution
                });
                const link = document.createElement("a");
                link.download = `${nameEntry.engName}_Korean_Name.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
            } catch (error) {
                console.error("Failed to save image:", error);
            }
        }
    };

    return (
        <div className="flex flex-col items-center space-y-8 w-full max-w-md">
            {/* Card Section */}
            <div ref={cardRef} className="w-full p-4 rounded-3xl bg-white/30 backdrop-blur-md border border-white/50 shadow-xl">
                <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-none rounded-2xl overflow-hidden">
                    <div className="h-3 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300" />
                    <CardHeader className="text-center pt-10 pb-4 relative">
                        <Sparkles className="absolute top-4 right-4 w-5 h-5 text-yellow-400 opacity-80" />
                        <CardTitle className="text-5xl font-bold text-gray-800 tracking-tight font-[family-name:var(--font-kor)]">
                            {nameEntry.korName.split(" (")[0]}
                        </CardTitle>
                        <CardDescription className="text-2xl font-serif italic text-gray-600 mt-3 font-[family-name:var(--font-playfair)]">
                            {nameEntry.engName}
                        </CardDescription>
                        <button
                            onClick={handlePlayAudio}
                            className="absolute top-1/2 right-8 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                            aria-label="Listen to pronunciation"
                        >
                            <Volume2 className="w-6 h-6" />
                        </button>
                    </CardHeader>
                    <CardContent className="space-y-8 pb-12 px-8">
                        <div className="text-center space-y-3">
                            <h3 className="text-xs font-bold text-purple-500 uppercase tracking-widest">
                                Meaning
                            </h3>
                            <p className="text-xl font-medium text-gray-700 leading-relaxed font-serif italic">
                                &quot;{nameEntry.meaning}&quot;
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center">
                            {nameEntry.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="px-4 py-1.5 text-sm font-semibold bg-white/80 text-purple-600 hover:bg-purple-50 transition-colors rounded-full border border-purple-100 shadow-sm"
                                >
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
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
