'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8" style={{ fontFamily: "var(--font-poppins)" }}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4" style={{ fontFamily: "var(--font-poppins)", letterSpacing: '-1px' }}>
              ASTRA
            </h1>
            <p className="text-2xl sm:text-3xl text-purple-200 font-light tracking-widest" style={{ fontFamily: "var(--font-inter)", marginTop: '6px' }}>
              MOVIE PRODUCTION
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in animation-delay-500">
            <Link
              href="/registration"
              className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Register
            </Link>
            <Link
              href="/scanner"
              className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Claim Scanner
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
