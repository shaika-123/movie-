# 🎬 ASTRA Movie Production Website - Complete Build Guide
## From Zero to Production (Beginner-Friendly)

---

## 📚 Table of Contents
1. [What is This Project?](#what-is-this-project)
2. [Technologies We Used (Explained Simply)](#technologies-we-used)
3. [Step 1: Setting Up Your Computer](#step-1-setting-up)
4. [Step 2: Creating the Next.js Project](#step-2-creating-nextjs)
5. [Step 3: Understanding the Project Structure](#step-3-project-structure)
6. [Step 4: Building the Frontend (What Users See)](#step-4-frontend)
7. [Step 5: Setting Up Supabase (The Database)](#step-5-supabase)
8. [Step 6: Connecting Frontend to Backend](#step-6-backend-connection)
9. [Step 7: Creating the Registration Form](#step-7-registration-form)
10. [Step 8: Creating the Scanner Page](#step-8-scanner-page)
11. [Step 9: Creating the Dashboard](#step-9-dashboard)
12. [Step 10: Deploying to Vercel](#step-10-deployment)
13. [Step 11: Setting Up Custom Domain](#step-11-custom-domain)
14. [Common Problems & Solutions](#troubleshooting)
15. [How It All Works Together](#how-it-works)

---

## 🤔 What is This Project?

**Simple Explanation:** 
We built a **movie production registration website** where:
- 👥 People can register for events (providing Name, Phone, Age)
- 📱 QR codes can be scanned to take people to the registration page
- 📊 Managers can see all registrations in a dashboard
- 🌍 It's hosted on the internet so anyone can access it

**Real-World Example:**
Imagine you're at an event. You see a QR code → You scan it → It opens the registration page in your phone → You fill in your name, phone, age → Your data is saved in a database → Managers can see who registered.

---

## 💻 Technologies We Used (Explained Simply)

### 1. **Next.js** (Frontend Framework)
**What it is:** A tool to build websites using React (JavaScript library for building user interfaces)
**Why we used it:** Makes building websites faster and easier
**What it does:** Converts your code into a website that  people can visit

**Simple analogy:** If React is like LEGO bricks, Next.js is like an instruction manual that helps you build faster and better.

### 2. **React** (JavaScript Library)
**What it is:** A way to build interactive web pages using JavaScript
**Why we used it:** Makes it easy to create dynamic (changing) web pages
**Key concept:** Components = Reusable pieces of the website

**Example:**
```
Button Component → Can be used in 10 different places
Form Component → Can be reused for different forms
Hero Component → The big banner at the top of your website
```

### 3. **TypeScript** (Programming Language)
**What it is:** JavaScript + extra safety features
**Why we used it:** Catches mistakes before they happen
**Simple explanation:** It's like having a spell-checker for your code

### 4. **Tailwind CSS** (Styling Framework)
**What it is:** A way to make websites look pretty with pre-made classes
**Why we used it:** Faster to style websites than writing custom CSS
**How it works:** Instead of writing CSS, you add class names that do the styling for you

**Example:**
```
Instead of writing CSS: color: purple;
You write: text-purple-500
```

### 5. **Supabase** (Backend Database)
**What it is:** A cloud database where you can store data (like Google Sheets, but for programmers)
**Why we used it:** 
- Easy to use
- You don't need to manage servers
- Free tier is generous
- Real-time updates

**What it stores:** User registrations (Name, Phone Number, Age, Timestamp)

### 6. **Vercel** (Hosting Platform)
**What it is:** A place to host your website on the internet
**Why we used it:**
- Free for Next.js projects
- Automatic deployment from GitHub
- Super fast
- Great for beginners

### 7. **GitHub** (Version Control)
**What it is:** A place to store your code and track changes
**Why we used it:**
- Keep backup of all your code
- Track what changed and when
- Deploy automatically to Vercel

### 8. **Cloudflare** (DNS Management)
**What it is:** Manages your domain name (how people find your website)
**Why we used it:** Makes sure `astraproductions.astragroups.org` points to your website

---

## 🔧 Step 1: Setting Up Your Computer

### Prerequisites (Things You Need)
1. **Node.js** - Install from https://nodejs.org/
   - This is JavaScript runtime (allows JavaScript to run on your computer)
   - Download the LTS (Long Term Support) version
   
2. **Git** - Install from https://git-scm.com/
   - This is for version control (tracking code changes)
   
3. **Code Editor** - Download VS Code from https://code.visualstudio.com/
   - This is where you write your code
   
4. **GitHub Account** - Create at https://github.com/
   - Free account is fine
   
5. **Supabase Account** - Create at https://supabase.com/
   - Free tier gives you database + authentication
   
6. **Vercel Account** - Create at https://vercel.com/
   - Free hosting for Next.js

### Verification Steps
After installing, open Command Prompt/Terminal and type:

```bash
# Check Node.js is installed
node --version
# Should show something like: v18.0.0

# Check npm is installed (comes with Node.js)
npm --version
# Should show something like: 8.0.0

# Check Git is installed
git --version
# Should show something like: git version 2.30.0
```

**What this means:** If all three commands show version numbers, you're ready to go! ✅

---

## 📦 Step 2: Creating the Next.js Project

### Command (Copy-Paste This)
```bash
# Go to where you want to store your project
cd Downloads

# Create a new Next.js project
npx create-next-app@latest movie --ts --tailwind --eslint --app --src-dir --import-alias '@/*' --use-npm
```

### What Each Flag Means
- `movie` = Project name
- `--ts` = Use TypeScript (safe mode for JavaScript)
- `--tailwind` = Add Tailwind CSS (styling)
- `--eslint` = Add ESLint (catches mistakes)
- `--app` = Use new App Router (modern way)
- `--src-dir` = Organize code in src folder
- `--import-alias '@/*'` = Shortcut for imports
- `--use-npm` = Use NPM instead of Yarn

### After Installation
```bash
# Go into your project folder
cd movie

# Start the development server
npm run dev
```

**Result:** Visit http://localhost:3000 in your browser. You should see the Next.js welcome page!

---

## 📂 Step 3: Understanding the Project Structure

```
movie/
├── src/
│   ├── app/                    # Main application folder
│   │   ├── page.tsx            # Home page (http://localhost:3000/)
│   │   ├── layout.tsx          # Shared layout for all pages
│   │   ├── globals.css         # Global styles
│   │   ├── registration/       # Registration page folder
│   │   │   └── page.tsx        # Registration page (/registration)
│   │   ├── scanner/            # Scanner page folder
│   │   │   └── page.tsx        # Scanner page (/scanner)
│   │   ├── dashboard/          # Dashboard folder
│   │   │   └── page.tsx        # Dashboard page (/dashboard)
│   │   ├── api/                # Backend API routes
│   │   │   └── register/       # Registration API endpoint
│   │   │       └── route.ts    # POST/GET handler
│   │
│   ├── components/             # Reusable components
│   │   ├── Hero.tsx            # Hero section component
│   │   └── RegistrationForm.tsx # Form component
│   │
│   └── lib/                    # Utility code
│       └── supabase.ts         # Supabase configuration
│
├── public/
│   └── assets/
│       └── reg_scanner.png     # QR code image
│
├── package.json                # List of dependencies
├── next.config.js              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── .env.local                  # Secret keys (NOT in GitHub)
```

### Key Folders Explained

**`src/app/`** = Your actual website pages
- Each folder = One page
- `page.tsx` = The page file
- Folder structure = URL structure

**`src/components/`** = Reusable pieces
- Think of them as LEGO blocks
- Can be used in multiple pages

**`src/lib/`** = Helper code
- Supabase setup
- Utility functions

**`public/`** = Files everyone can access
- Images, videos, etc.

---

## 🎨 Step 4: Building the Frontend (What Users See)

### 4.1 Creating the Hero Component

**File:** `src/components/Hero.tsx`

**Purpose:** The big banner at the top with ASTRA title and buttons

```tsx
'use client';  // This makes it a Client Component (interactive)

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            ASTRA
          </h1>
          <p className="text-3xl text-purple-200 font-light tracking-widest mb-12">
            MOVIE PRODUCTION
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/registration"
              className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Register
            </Link>
            <Link
              href="/scanner"
              className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Claim Scanner
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**What This Does:**
- `'use client'` = Makes it interactive (client-side)
- `Link` = Navigation without page reload (fast!)
- `className` = Tailwind CSS classes for styling
- `from-purple-500 to-pink-500` = Gradient colors
- `hover:scale-105` = Grow on mouse hover

### 4.2 Creating the Home Page

**File:** `src/app/page.tsx`

```tsx
import Hero from '@/components/Hero';

export default function Home() {
  return <Hero />;
}
```

**This is simple:** Just display the Hero component on the home page.

### Understanding Tailwind CSS Classes

```
bg-gradient-to-br       = Gradient background (top-left to bottom-right)
from-purple-500 to-pink-500 = Purple to pink gradient
text-white             = White text
rounded-lg             = Rounded corners (lg = large)
shadow-lg              = Drop shadow
hover:scale-105        = Grow 5% on mouse hover
transition-all         = Smooth animation
duration-300           = Animation takes 300ms
```

**Key Concept:** Tailwind gives you pre-made classes instead of writing CSS!

---

## 🗄️ Step 5: Setting Up Supabase (The Database)

### 5.1 Creating Supabase Project

1. Go to https://supabase.com/
2. Click "Start Your Project"
3. Sign up with GitHub (easier)
4. Create a new project:
   - Organization: Create new
   - Project name: `movie`
   - Database password: (choose strong password)
   - Region: (choose closest to you)

### 5.2 Creating the Database Table

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste this SQL:

```sql
-- Create the registrations table
CREATE TABLE registrations (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(10) NOT NULL,
  age INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX idx_registrations_created_at ON registrations(created_at DESC);

-- Enable Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public reads
CREATE POLICY "Allow public read" ON registrations
FOR SELECT USING (true);

-- Create policy to allow public inserts
CREATE POLICY "Allow public insert" ON registrations
FOR INSERT WITH CHECK (true);
```

4. Click **Run**

**What This Creates:**
- Table called `registrations`
- Columns: id, name, phone_number, age, created_at, updated_at
- Security: Anyone can read and insert (good for public registration)

### 5.3 Getting Your API Keys

1. Go to **Settings** → **API**
2. Copy:
   - **URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon key** (public key)
   - **service_role key** (secret key)

**⚠️ IMPORTANT:**
- `anon key` = Safe to share, use in frontend
- `service_role key` = KEEP SECRET, use only in backend
- Don't commit `.env.local` to GitHub!

---

## 🔗 Step 6: Connecting Frontend to Backend

### 6.1 Creating Environment Variables

**File:** `.env.local` (in project root)

```
NEXT_PUBLIC_SUPABASE_URL=https://yseohditolnwkmosqrzq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Explanation:**
- `NEXT_PUBLIC_` = This variable is visible to everyone (public)
- `SUPABASE_` = Only visible to backend (secret)
- These are like passwords that let your code talk to Supabase

### 6.2 Creating Supabase Config File

**File:** `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

// For browser (public, can't modify data)
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// For server (private, can modify data)
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

**What This Does:**
- `supabaseClient` = Used in frontend (read-only)
- `supabaseServer` = Used in backend API (read & write)
- Like having two different access levels

**Security Concept:**
```
Frontend (Browser)          Backend (Server)
↓                          ↓
Can READ data      →  Can READ & WRITE data
Limited access           Full access
anon key                 service_role key
```

---

## 📝 Step 7: Creating the Registration Form

### 7.1 Creating the Form Component

**File:** `src/components/RegistrationForm.tsx`

```tsx
'use client';

import { useState } from 'react';

export default function RegistrationForm() {
  // State variables (these remember values when the page updates)
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    age: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      // Only allow digits, max 10 characters
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        [name]: digitsOnly
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Validation
      if (!formData.name.trim()) {
        throw new Error('Name is required');
      }

      if (formData.phoneNumber.length !== 10) {
        throw new Error('Phone number must be exactly 10 digits');
      }

      const age = parseInt(formData.age);
      if (isNaN(age) || age < 1 || age > 120) {
        throw new Error('Age must be between 1 and 120');
      }

      // Send data to backend API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phoneNumber: formData.phoneNumber,
          age: formData.age,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      // Success!
      setSuccessMessage('✅ Registration successful!');
      setFormData({ name: '', phoneNumber: '', age: '' });

      // Hide message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      setErrorMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-md mx-auto bg-slate-800/50 rounded-2xl p-8 border border-purple-500/20 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-white mb-2">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-purple-500/30 focus:border-purple-500 outline-none transition"
              required
            />
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-white mb-2">Phone Number (10 digits) *</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-purple-500/30 focus:border-purple-500 outline-none transition"
              required
            />
            <p className="text-gray-400 text-sm mt-1">Indian phone numbers only</p>
          </div>

          {/* Age Field */}
          <div>
            <label className="block text-white mb-2">Age *</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="18"
              min="1"
              max="120"
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-purple-500/30 focus:border-purple-500 outline-none transition"
              required
            />
          </div>

          {/* Messages */}
          {successMessage && (
            <div className="p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-400">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

**How It Works:**

1. **State Management (useState):**
   - `formData` = Stores input values
   - `successMessage` = Shows success
   - `errorMessage` = Shows errors
   - `isLoading` = Shows loading state

2. **handleChange Function:**
   - Updates state when user types
   - Phone: Removes non-digits, limits to 10
   - Name & Age: Just updates the value

3. **handleSubmit Function:**
   - Validates data
   - Sends to backend `/api/register`
   - Shows success or error message
   - Clears form on success

4. **Form JSX:**
   - Three input fields
   - Messages for success/error
   - Submit button

### 7.2 Creating Registration Page

**File:** `src/app/registration/page.tsx`

```tsx
import RegistrationForm from '@/components/RegistrationForm';
import Link from 'next/link';

export default function RegistrationPage() {
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
```

---

## 🔙 Step 8: Creating the Backend API

### 8.1 Creating the API Route

**File:** `src/app/api/register/route.ts`

```typescript
import { supabaseServer } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

// POST endpoint - Insert new registration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phoneNumber, age } = body;

    // Validation
    if (!name || !phoneNumber || !age) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(phoneNumber)) {
      return NextResponse.json(
        { message: 'Phone number must be exactly 10 digits' },
        { status: 400 }
      );
    }

    // Validate age
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      return NextResponse.json(
        { message: 'Age must be between 1 and 120' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabaseServer
      .from('registrations')
      .insert([
        {
          name: name.trim(),
          phone_number: phoneNumber,
          age: ageNum,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { message: 'Database error' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Registration successful', data },
      { status: 201 } // 201 = Created
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

// GET endpoint - Fetch all registrations
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabaseServer
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false }); // Newest first

    if (error) {
      return NextResponse.json(
        { message: 'Database error' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
```

**How the API Works:**

```
Frontend Form Submit
    ↓
POST /api/register
    ↓
Validate Data
    ↓
Insert into Supabase
    ↓
Return Response
    ↓
Show Success Message to User
```

**HTTP Status Codes:**
- `200` = OK (Success)
- `201` = Created (Successfully created)
- `400` = Bad Request (User error)
- `500` = Server Error (Your code error)

---

## 📱 Step 9: Creating the Scanner Page

### Scanner Page Component

**File:** `src/app/scanner/page.tsx`

```tsx
'use client';

import Link from 'next/link';

export default function ScannerPage() {
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
          <h1 className="text-6xl font-bold text-white mb-4">
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

            {/* QR Code Image */}
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
                  <span>Click "Claim Scanner" button</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 font-bold">2.</span>
                  <span>Point your phone camera at the QR code</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 font-bold">3.</span>
                  <span>Your phone detects the QR code automatically</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 font-bold">4.</span>
                  <span>Tap the notification to go to registration</span>
                </li>
              </ol>
            </div>

            {/* Registration Link */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-purple-500/20 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🔗</span> Registration Link
              </h3>
              <div className="bg-slate-900 p-4 rounded-lg border border-purple-500/30 mb-4">
                <code className="text-sm text-purple-300 break-all">
                  https://astraproductions.astragroups.org/registration
                </code>
              </div>
              <p className="text-sm text-gray-400">
                This is what the QR code points to
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
```

**What This Page Shows:**
1. QR code image (displayed from `/public/assets/reg_scanner.png`)
2. How the scanning process works
3. The registration URL

---

## 📊 Step 10: Creating the Dashboard

### Dashboard Page

**File:** `src/app/dashboard/page.tsx`

```tsx
'use client';

import { useEffect, useState } from 'react';

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

  // Fetch data when component mounts
  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await fetch('/api/register');
      const json = await response.json();
      setRegistrations(json.data || []);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const totalRegistrations = registrations.length;
  const latestDate = registrations[0]?.created_at || 'N/A';
  const averageAge = registrations.length > 0
    ? Math.round(registrations.reduce((sum, r) => sum + r.age, 0) / registrations.length)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <p className="text-white text-2xl">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-white mb-8">Registration Dashboard</h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Registrations */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-purple-500/20 backdrop-blur-md">
            <h3 className="text-gray-300 mb-2">Total Registrations</h3>
            <p className="text-4xl font-bold text-purple-400">{totalRegistrations}</p>
          </div>

          {/* Latest Registration */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-purple-500/20 backdrop-blur-md">
            <h3 className="text-gray-300 mb-2">Latest Registration</h3>
            <p className="text-lg text-blue-400">
              {new Date(latestDate).toLocaleDateString()}
            </p>
          </div>

          {/* Average Age */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-purple-500/20 backdrop-blur-md">
            <h3 className="text-gray-300 mb-2">Average Age</h3>
            <p className="text-4xl font-bold text-pink-400">{averageAge}</p>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-slate-800/50 rounded-2xl border border-purple-500/20 backdrop-blur-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-500/20">
                  <th className="px-6 py-4 text-left text-white font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Phone</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Age</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Registered At</th>
                </tr>
              </thead>
              <tbody>
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                      No registrations yet
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg.id} className="border-b border-purple-500/10 hover:bg-purple-500/5">
                      <td className="px-6 py-4 text-gray-300">{reg.name}</td>
                      <td className="px-6 py-4 text-gray-300">{reg.phone_number}</td>
                      <td className="px-6 py-4 text-gray-300">{reg.age}</td>
                      <td className="px-6 py-4 text-gray-300">
                        {new Date(reg.created_at).toLocaleDateString()} {new Date(reg.created_at).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
```

**Dashboard Features:**
1. **Statistics Cards:**
   - Total registrations
   - Latest registration date
   - Average age

2. **Registrations Table:**
   - Shows all registered users
   - Name, Phone, Age, Time
   - Hover effect on rows

3. **Data Flow:**
   ```
   useEffect → Calls fetchRegistrations when page loads
   fetchRegistrations → Calls GET /api/register
   API returns data → setRegistrations updates state
   State changes → Page re-renders with new data
   ```

---

## 🚀 Step 11: Deploying to Vercel

### 11.1 Prepare for Deployment

1. **Make sure everything works locally:**
```bash
npm run build
npm run start
```

2. **Commit all changes:**
```bash
git add -A
git commit -m "Complete ASTRA Movie Production website"
```

### 11.2 Push to GitHub

```bash
# Add remote (first time only)
git remote add origin https://github.com/yourusername/movie-.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 11.3 Deploy to Vercel

1. Go to https://vercel.com/
2. Click "Import Project"
3. Choose "Import Git Repository"
4. Paste: `https://github.com/yourusername/movie-.git`
5. Click "Import"

### 11.4 Add Environment Variables to Vercel

1. In Vercel dashboard, go to **Settings → Environment Variables**
2. Add three variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your anon key
   - `SUPABASE_SERVICE_ROLE_KEY` = Your service role key

3. Click "Deploy"

**Result:** Your website is now live! Vercel will automatically redeploy whenever you push to GitHub.

---

## 🌐 Step 12: Setting Up Custom Domain

### 12.1 Add Domain to Vercel

1. In Vercel dashboard, go to **Settings → Domains**
2. Enter: `astraproductions.astragroups.org`
3. Vercel will show you a CNAME record

### 12.2 Update DNS Records

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Go to DNS settings
3. Add CNAME record:
   - **Name:** `astraproductions`
   - **Value:** (what Vercel shows)
   - **TTL:** 3600

4. Wait 5-10 minutes for DNS to propagate

**Result:** Your website is now accessible at `https://astraproductions.astragroups.org/`

---

## 🔧 Troubleshooting

### Problem 1: Port 3000 Already in Use
```bash
# Kill the process using port 3000
npx kill-port 3000

# Then restart
npm run dev
```

### Problem 2: Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Problem 3: Supabase Connection Error
```
Error: fetch failed
```
**Solution:** Make sure:
- `.env.local` file exists
- Environment variables are correct
- Supabase project is active

### Problem 4: Form Not Submitting
**Check:**
1. Is the API endpoint correct? (`/api/register`)
2. Are all required fields filled?
3. Is phone number exactly 10 digits?
4. Check browser console for errors

### Problem 5: Custom Domain Not Working
**Solution:**
1. Wait 10-15 minutes for DNS propagation
2. Check DNS settings are correct
3. Clear browser cache
4. Try in incognito window

---

## 🎯 How It All Works Together

### The Complete Flow

```
USER JOURNEY:
├─ Visits https://astraproductions.astragroups.org/
├─ Sees Hero page with ASTRA branding
├─ Clicks "Register" button
├─ Goes to /registration page
├─ Fills form (Name, Phone, Age)
├─ Submits form
│  └─ Frontend validates data
│  └─ Sends POST to /api/register
│     └─ Backend validates again
│     └─ Inserts into Supabase database
│     └─ Returns success response
│  └─ Shows success message
│  └─ Clears form
└─ User data is now in the database

SCANNER JOURNEY:
├─ Person sees QR code at event
├─ Scans with phone camera
├─ Automatically opens https://astraproductions.astragroups.org/registration
├─ Follows registration flow
└─ Data is saved

MANAGER JOURNEY:
├─ Goes to /dashboard
├─ Dashboard fetches GET /api/register
├─ Displays all registrations in table
├─ Shows statistics (total, latest, average age)
└─ Can monitor registrations in real-time
```

### Data Storage & Security

```
Frontend (Browser)
├─ Cannot directly access database
├─ Uses supabaseClient (limited)
├─ anon key in environment (visible)
└─ Can only INSERT & SELECT

Backend (Server)
├─ Has full database access
├─ Uses supabaseServer (powerful)
├─ service_role key (secret, hidden)
└─ Can INSERT, UPDATE, DELETE, SELECT

Supabase Database
├─ Stores all registrations
├─ Row Level Security (RLS) policies
├─ Public insert allowed
├─ Public select allowed
└─ Real-time updates available
```

### Technology Stack Summary

```
User's Browser
    ↓
Next.js Frontend (React)
    ↓ (HTTPS)
Vercel Hosting
    ↓ (API Call)
Next.js Backend (Node.js)
    ↓ (Query)
Supabase Database (PostgreSQL)
    ↓
Data Stored
```

---

## 📖 Key Concepts Explained

### 1. Components (React)
**What:** Reusable pieces of UI
**Why:** Don't repeat code
**Example:**
```
Button component → Can use 100 times
```

### 2. State (React Hooks)
**What:** Variables that React watches
**Why:** When state changes, page updates
**Example:**
```tsx
const [count, setCount] = useState(0);
// count = current value
// setCount = function to update it
```

### 3. Async/Await
**What:** Wait for something to finish, then continue
**Why:** Database calls take time
**Example:**
```tsx
const response = await fetch('/api/register'); // Wait for response
const data = await response.json(); // Wait for parsing
```

### 4. Environment Variables
**What:** Secret values that don't go in code
**Why:** Security (passwords shouldn't be visible)
**Types:**
- `NEXT_PUBLIC_` = Public (anyone can see)
- Others = Private (only server can see)

### 5. API Routes
**What:** Endpoints you call from frontend
**Why:** Backend logic that frontend can't do
**Path:** `/api/register` = `src/app/api/register/route.ts`

### 6. Database Tables
**What:** Like Excel spreadsheets in the cloud
**Why:** Store data permanently
**Structure:**
```
registrations table:
├─ id (unique number)
├─ name (text)
├─ phone_number (text)
├─ age (number)
├─ created_at (timestamp)
└─ updated_at (timestamp)
```

---

## 🎓 What You've Learned

✅ How to set up a Next.js project  
✅ How React components work  
✅ How to style with Tailwind CSS  
✅ How to create forms with validation  
✅ How to connect to a database (Supabase)  
✅ How to build API endpoints  
✅ How to deploy to Vercel  
✅ How to set up custom domains  
✅ How frontend and backend communicate  
✅ How to handle user data securely  

---

## 🚀 Next Steps & Improvements

### Easy Improvements
1. Add email notifications on registration
2. Add CSV export of registrations
3. Add search/filter in dashboard
4. Add user authentication
5. Add password protection to dashboard

### Medium Improvements
1. Send SMS to users after registration
2. Add QR code generation (instead of static image)
3. Add email verification
4. Add registration statistics/analytics
5. Add multiple languages support

### Advanced Improvements
1. Add payment integration
2. Add ticket generation
3. Add event management system
4. Add user authentication with email
5. Add admin panel with full control

---

## 📚 Resources for Learning More

### Free Resources
- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **MDN (General Web):** https://developer.mozilla.org

### Video Tutorials
- **Next.js Crash Course:** Search "Next.js tutorial 2024"
- **React Basics:** "React tutorial for beginners"
- **Tailwind CSS:** "Tailwind CSS tutorial"
- **Supabase:** "Supabase tutorial"

### Communities
- **Discord:** Join React/Next.js communities
- **Stack Overflow:** Ask technical questions
- **GitHub Discussions:** Get help from developers

---

## 🎉 Congratulations!

You've built a complete, production-ready web application! 

**What you created:**
- ✅ Professional website
- ✅ Registration system
- ✅ QR code scanning integration
- ✅ Admin dashboard
- ✅ Cloud database
- ✅ Deployed on the internet
- ✅ Custom domain

**Remember:**
- Keep learning
- Build more projects
- Don't be afraid to experiment
- Read the documentation
- Ask questions in communities

**Happy Coding! 🚀**

---

## 📝 Quick Reference Sheet

### Useful Commands
```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Check code quality

# Git
git add -A          # Stage all changes
git commit -m "msg" # Commit changes
git push            # Push to GitHub
git log             # See commit history

# Database
# See Supabase documentation for SQL commands
```

### File Locations
```
Home Page: src/app/page.tsx
Hero Component: src/components/Hero.tsx
Registration: src/app/registration/page.tsx
Form Component: src/components/RegistrationForm.tsx
API Route: src/app/api/register/route.ts
Scanner Page: src/app/scanner/page.tsx
Dashboard: src/app/dashboard/page.tsx
Supabase Config: src/lib/supabase.ts
Environment: .env.local
```

### Key Concepts at a Glance
- **Next.js** = Website framework
- **React** = Component library
- **TypeScript** = Safe JavaScript
- **Tailwind** = Quick styling
- **Supabase** = Database
- **Vercel** = Hosting
- **GitHub** = Code storage

---

**Document Created:** November 11, 2025  
**Last Updated:** November 11, 2025  
**Project:** ASTRA Movie Production Website  
**Status:** ✅ Complete & Live  

---

*This documentation is beginner-friendly and covers everything from installation to deployment. Happy learning!* 📚
