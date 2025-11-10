'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Registration {
  id: number;
  name: string;
  phone_number: string;
  age: number;
  created_at: string;
}

export default function Dashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch('/api/register');
        const data = await response.json();
        
        if (data.success) {
          setRegistrations(data.data);
        } else {
          setError('Failed to fetch registrations');
        }
      } catch (err) {
        setError('Error fetching registrations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      {/* Back to Home Link */}
      <Link
        href="/"
        className="mb-8 inline-block px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-md transition"
      >
        ← Back to Home
      </Link>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-2">
          Registration <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Dashboard</span>
        </h1>
        <p className="text-gray-300 mb-8">View all registered users</p>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/20 backdrop-blur-md">
                <p className="text-gray-400 text-sm">Total Registrations</p>
                <p className="text-4xl font-bold text-purple-400 mt-2">{registrations.length}</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/20 backdrop-blur-md">
                <p className="text-gray-400 text-sm">Latest Registration</p>
                <p className="text-2xl font-bold text-pink-400 mt-2">
                  {registrations.length > 0 ? new Date(registrations[0].created_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/20 backdrop-blur-md">
                <p className="text-gray-400 text-sm">Average Age</p>
                <p className="text-2xl font-bold text-blue-400 mt-2">
                  {registrations.length > 0
                    ? Math.round(
                        registrations.reduce((sum, reg) => sum + reg.age, 0) / registrations.length
                      )
                    : 'N/A'}
                </p>
              </div>
            </div>

            {/* Registrations Table */}
            {registrations.length > 0 ? (
              <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 backdrop-blur-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-500/20 bg-purple-900/20">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Phone Number</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Age</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Submitted At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((reg, index) => (
                        <tr
                          key={index}
                          className="border-b border-purple-500/10 hover:bg-purple-900/20 transition"
                        >
                          <td className="px-6 py-4 text-white">{reg.name}</td>
                          <td className="px-6 py-4 text-gray-300">{reg.phone_number}</td>
                          <td className="px-6 py-4 text-gray-300">{reg.age}</td>
                          <td className="px-6 py-4 text-gray-400 text-sm">
                            {new Date(reg.created_at).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No registrations yet</p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
