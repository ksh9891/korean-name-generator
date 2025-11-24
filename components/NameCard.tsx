"use client";

import { useRef, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Download, Sparkles, Copy, Check, ShoppingBag } from "lucide-react";
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
    const [isCopied, setIsCopied] = useState(false);

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

    const handleCopyName = () => {
        const korName = nameEntry.korName.split(" (")[0];
        navigator.clipboard.writeText(korName);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

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
            <div className="text-center space-y-6 max-w-sm w-full">
                <p className="text-gray-600 leading-relaxed">
                    <span className="font-serif font-bold text-gray-800">{nameEntry.engName}</span> means{" "}
                    <span className="italic">{nameEntry.meaning}</span>. In Korean,{" "}
                    <span className="font-bold text-purple-600">{nameEntry.korName.split(" (")[0]}</span> creates a specialized vibe that reflects your unique personality.
                </p>

                <div className="pt-6 border-t border-gray-200/50 w-full flex flex-col items-center space-y-3">
                    {/* Button 1: Copy Name */}
                    <Button
                        onClick={handleCopyName}
                        variant="outline"
                        className={`w-full max-w-xs py-5 rounded-xl font-bold transition-all ${isCopied
                            ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                            }`}
                    >
                        {isCopied ? (
                            <>
                                <Check className="w-4 h-4 mr-2" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Name for Order
                            </>
                        )}
                    </Button>

                    {/* Helper Text */}
                    <p className="text-xs text-gray-500 font-medium px-4">
                        Copy your name first, then paste it in the Etsy order box!
                    </p>

                    {/* Button 2: Shop on Etsy */}
                    <a
                        href="https://www.etsy.com/search?q=Custom%20Korean%20Name%20Necklace&ref=search_bar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full max-w-xs inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#F1641E] hover:bg-[#D65215] transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg gap-2"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        Get Your Necklace on Etsy
                    </a>
                </div>
            </div>
        </div>

    );
}
