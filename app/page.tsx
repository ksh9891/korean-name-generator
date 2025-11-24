"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import namesData from "@/data/names.json";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/name/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/50 shadow-sm mb-4">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-600">Discover your Korean identity</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 tracking-tight leading-tight">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Korean Name</span> <br />
            & Meaning
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Curated by K-Trend Experts for You. Discover the perfect Korean name that resonates with your personality and style.
          </p>

          <form onSubmit={handleSearch} className="max-w-md mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-200" />
            <div className="relative flex items-center bg-white rounded-full shadow-lg p-2">
              <Search className="w-5 h-5 text-gray-400 ml-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter your English name..."
                className="w-full px-4 py-3 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 outline-none"
              />
              <button
                type="submit"
                className="bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Browse Section */}
      <section className="max-w-7xl mx-auto px-4 pb-32">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900">Popular Names</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent ml-8" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {namesData.slice(0, 100).map((name) => (
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
      </section>
    </div>
  );
}
