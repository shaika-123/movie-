'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ScannerPage() {
  const [scannerImage, setScannerImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      {/* Back to Home Link */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-md transition"
      >
        ← Back to Home
      </Link>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-10">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
            Scanner <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Registration</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Scan QR codes to register for ASTRA Movie Production events
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Scanner Display Section */}
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-purple-500/20 backdrop-blur-md shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Scanner</h2>

            {/* Scanner Placeholder */}
            <div className="bg-slate-900/50 rounded-xl aspect-square flex items-center justify-center border-2 border-dashed border-purple-500/30 mb-6 overflow-hidden">
              <img
                src="/assets/reg_scanner.png"
                alt="Registration Scanner QR Code"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Information Section */}
          <div className="space-y-6">
            {/* How it Works */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-purple-500/20 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">📱</span> How It Works
              </h3>
              <ol className="space-y-3 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-purple-400 font-bold">1.</span>
                  <span>Click "Start Scanner"</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 font-bold">2.</span>
                  <span>Point camera at QR code</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 font-bold">3.</span>
                  <span>Scan automatically detects</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 font-bold">4.</span>
                  <span>Redirects to registration</span>
                </li>
              </ol>
            </div>

            {/* QR Code Link */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-purple-500/20 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🔗</span> QR Code URL
              </h3>
              <div className="bg-slate-900 p-4 rounded-lg border border-purple-500/30 mb-4">
                <code className="text-sm text-purple-300 break-all">
                  https://astraproduction.astragroups.org/register
                </code>
              </div>
              <p className="text-sm text-gray-400">
                Use this URL to generate your QR codes in the Python scanner
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        
      </div>
    </main>
  );
}
