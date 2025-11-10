import RegistrationForm from '@/components/RegistrationForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Back to Home Link */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-md transition"
      >
        ← Back to Home
      </Link>

      {/* Registration Form */}
      <RegistrationForm />
    </main>
  );
}
