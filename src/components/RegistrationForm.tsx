'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  phoneNumber: string;
  age: string;
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phoneNumber: '',
    age: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // For phone number, only allow digits and max 10 characters
    if (name === 'phoneNumber') {
      const digitOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({
        ...prev,
        [name]: digitOnly,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send data to API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Get the actual error message from the server
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}: Registration failed`);
      }

      const result = await response.json();
      console.log('Registration successful:', result);
      
      setSubmitted(true);
      setFormData({
        name: '',
        phoneNumber: '',
        age: '',
      });

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert(`Error submitting registration: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Register with <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">ASTRA MOVIE PRODUCTION</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Join us on the event!
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-800/50 rounded-2xl p-8 sm:p-12 shadow-2xl border border-purple-500/20 backdrop-blur-md">
          {submitted && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg">
              <p className="text-green-400 font-semibold">✓ Registration Successful!</p>
              <p className="text-green-300 text-sm mt-1">Thank you for registering. We'll be in touch soon!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-200 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-200 mb-2">
                Phone Number (10 digits) *
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                placeholder="98765 43210"
                pattern="[0-9]{10}"
                className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
              <p className="text-xs text-gray-400 mt-1">Enter 10-digit Indian phone number</p>
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-sm font-semibold text-gray-200 mb-2">
                Age *
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                placeholder="Enter your age"
                min="1"
                max="120"
                className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-500 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl mt-8"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Submitting...
                </span>
              ) : (
                'Register Now'
              )}
            </button>

            {/* Required Fields Note */}
            <p className="text-center text-sm text-gray-400">* All fields are required</p>
          </form>
        </div>
      </div>
    </section>
  );
}
