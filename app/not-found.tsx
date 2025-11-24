import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import namesData from "@/data/names.json";

export default function NotFound() {
    // Get 3 random names for recommendation
    const randomNames = [...namesData]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex flex-col items-center justify-center p-4 text-center">
            <div className="max-w-4xl w-full space-y-12">
                {/* Message Section */}
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 tracking-tight">
                        Oops! We haven&apos;t translated <br />
                        that name yet.
                    </h1>
                    <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
                        But don&apos;t worry! Here are some beautiful Korean names popular right now.
                    </p>
                </div>

                {/* Recommendations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                    {randomNames.map((name) => (
                        <Link
                            key={name.engName}
                            href={`/name/${name.engName.toLowerCase()}`}
                            className="group relative bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-kor)] mb-1">
                                        {name.korName.split(" (")[0]}
                                    </h3>
                                    <p className="text-gray-500 font-serif italic">{name.engName}</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
                                </div>
                            </div>
                            <div className="relative mt-4 flex flex-wrap gap-2">
                                {name.tags.slice(0, 2).map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs px-2 py-1 rounded-md bg-gray-100/80 text-gray-600 group-hover:bg-white/80 transition-colors"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Go Home Button */}
                <div>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all hover:scale-105 shadow-lg"
                    >
                        <Home className="w-5 h-5" />
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
