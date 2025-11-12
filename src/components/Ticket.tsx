'use client';

import { useRef } from 'react';

interface TicketProps {
  id: string;
  name: string;
  age: number;
  date: string;
  time: string;
}

interface TicketDisplayProps extends TicketProps {
  onRegisterAnother?: () => void;
}

// Separate component for just the ticket card (for PDF generation)
function TicketCard({ id, name, age, date, time }: TicketProps) {
  return (
    <div
      className="max-w-2xl mx-auto bg-gradient-to-br from-purple-900 via-slate-800 to-slate-900 rounded-2xl p-8 border-2 border-purple-500 shadow-2xl"
      style={{
        fontFamily: "var(--font-poppins)",
      }}
    >
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b border-purple-500/30">
        <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text mb-2">
          ASTRA
        </h1>
        <p className="text-purple-200 text-lg font-light tracking-wider">
          MOVIE PRODUCTION
        </p>
        <p className="text-purple-300 text-sm mt-2">EVENT TICKET</p>
      </div>

      {/* Ticket Details */}
      <div className="space-y-5 mb-8">
        {/* Ticket ID */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">
            Ticket ID
          </p>
          <p className="text-white text-2xl font-bold font-mono">
            {id}
          </p>
        </div>

        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">
              Name
            </p>
            <p className="text-white text-lg font-semibold">{name}</p>
          </div>

          {/* Age */}
          <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">
              Age
            </p>
            <p className="text-white text-lg font-semibold">{age} years</p>
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">
              Date
            </p>
            <p className="text-white text-lg font-semibold">{date}</p>
          </div>

          <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">
              Time
            </p>
            <p className="text-white text-lg font-semibold">{time}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-purple-500/30 text-center">
        <p className="text-purple-300 text-sm">
          Thank you for registering! Keep this ticket safe.
        </p>
        <p className="text-gray-500 text-xs mt-2">
          Ticket generated on {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

// Main display component with buttons
export default function Ticket({ id, name, age, date, time, onRegisterAnother }: TicketDisplayProps) {
  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!ticketRef.current) return;

    // Dynamically import html2pdf only on client side
    const html2pdf = (await import('html2pdf.js')).default;
    
    const element = ticketRef.current;
    const opt = {
      margin: 10,
      filename: `Ticket-${id}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait' as const, unit: 'mm', format: 'a4' },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="space-y-6">
      {/* Hidden Ticket for PDF generation */}
      <div ref={ticketRef} style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}>
        <TicketCard id={id} name={name} age={age} date={date} time={time} />
      </div>

      {/* Visible Ticket Card */}
      <TicketCard id={id} name={name} age={age} date={date} time={time} />

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={downloadPDF}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl cursor-pointer"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          ⬇️ Download Ticket as PDF
        </button>
        <button
          onClick={async () => {
            await downloadPDF();
            onRegisterAnother?.();
          }}
          className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          ← Register Another
        </button>
      </div>
    </div>
  );
}
