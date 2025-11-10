# Movie Website - Next.js Project

A modern, fully configured Next.js website for ASTRA Movie Production built with TypeScript, Tailwind CSS, Supabase, and ESLint.

## � Complete Setup Guide

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free at https://supabase.com)

### Step 1: Clone/Open Project

```bash
cd movie
```

### Step 2: Install All Dependencies

```bash
npm install
```

### Step 3: Install Supabase Client (if not already done)

```bash
npm install @supabase/supabase-js
```

### Step 4: Setup Environment Variables

Create `.env.local` file in project root:

```bash
# Windows
echo. > .env.local

# macOS/Linux
touch .env.local
```

Add these credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Step 5: Create Supabase Table

Go to Supabase Dashboard → SQL Editor → New Query, paste:

```sql
CREATE TABLE registrations (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  age INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_registrations_phone ON registrations(phone_number);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON registrations
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read" ON registrations
  FOR SELECT
  USING (true);
```

### Step 6: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## �📋 Project Setup Commands

This project was initialized using the following command:

```bash
npx create-next-app@latest movie --ts --tailwind --eslint --app --src-dir --import-alias '@/*' --use-npm
```

### Command Breakdown

| Flag | Description |
|------|-------------|
| `npx create-next-app@latest` | Creates a new Next.js application with the latest version |
| `movie` | Project directory name (must be lowercase for npm restrictions) |
| `--ts, --typescript` | Initialize as a TypeScript project for type safety |
| `--tailwind` | Initialize with Tailwind CSS for utility-first styling |
| `--eslint` | Initialize with ESLint for code quality checking |
| `--app` | Use the App Router (latest Next.js routing system) |
| `--src-dir` | Organize code inside a `src/` directory for better structure |
| `--import-alias '@/*'` | Setup import alias for cleaner, shorter imports |
| `--use-npm` | Use npm as the package manager |

## 🚀 Quick Start (After First Setup)

### Step 1: Navigate to Project
```bash
cd movie
```

### Step 2: Start Development Server
```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available npm Scripts

```bash
# Development
npm run dev              # Start development server with hot reload on localhost:3000

# Production
npm run build            # Create optimized production build
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint to check code quality
npm run lint --fix       # Automatically fix linting issues
```

## 📁 Project Structure

```
movie/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout component
│   │   ├── page.tsx             # Home page component
│   │   ├── favicon.ico          # Website icon
│   │   └── globals.css          # Global styles
│   └── components/              # Reusable components (create as needed)
├── public/                      # Static assets (images, fonts, etc.)
├── node_modules/                # Installed dependencies (do not commit)
├── .eslintrc.json              # ESLint configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies and scripts
├── package-lock.json           # Locked dependency versions
├── README.md                   # This file
└── .git/                       # Git repository (auto-initialized)
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js](https://nextjs.org/) | React framework for production with server-side rendering |
| [TypeScript](https://www.typescriptlang.org/) | JavaScript with static type checking |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework for styling |
| [ESLint](https://eslint.org/) | JavaScript linter for code quality and consistency |
| [Supabase](https://supabase.com/) | Cloud PostgreSQL database for data storage |
| [npm](https://www.npmjs.com/) | Node package manager |

## 🗄️ Database Setup - Supabase

### Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Create `.env.local` File

Create a `.env.local` file in the project root with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Get credentials from:**
- Go to [Supabase Dashboard](https://supabase.com)
- Select your project
- Go to **Settings** → **API**
- Copy the URLs and keys

### Create Registrations Table

In Supabase SQL Editor, run:

```sql
-- Create registrations table
CREATE TABLE registrations (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  age INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on phone_number
CREATE INDEX idx_registrations_phone ON registrations(phone_number);

-- Enable RLS
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Allow public insert
CREATE POLICY "Allow public insert" ON registrations
  FOR INSERT
  WITH CHECK (true);

-- Allow public read
CREATE POLICY "Allow public read" ON registrations
  FOR SELECT
  USING (true);
```

### Verify Setup

After setting up, the data flow works like this:
- User submits form → API route validates → Data saves to Supabase
- Dashboard fetches from Supabase → Shows all registrations

**API Endpoints:**
- `POST /api/register` - Submit registration
- `GET /api/register` - Retrieve all registrations

**Dashboard:** http://localhost:3000/dashboard

## 🎨 Styling with Tailwind CSS

Use Tailwind utility classes directly in your components:

```tsx
// src/app/page.tsx
export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <h1 className="text-5xl font-bold text-white">Welcome to Next.js!</h1>
    </div>
  )
}
```

**Customize Tailwind:**
- Edit `tailwind.config.ts` for theme customization
- Add custom CSS in `src/app/globals.css`

## 🔤 TypeScript Support

All components use TypeScript for type safety. Example:

```tsx
interface ButtonProps {
  text: string;
  onClick: () => void;
}

export function Button({ text, onClick }: ButtonProps) {
  return <button onClick={onClick}>{text}</button>
}
```

## 📝 Code Quality with ESLint

Ensure code follows best practices:

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint --fix
```

## 🌍 Environment Variables

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_API_URL=https://api.example.com
API_SECRET_KEY=your_secret_here
```

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## 🚢 Deployment

### Deploy on Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy Anywhere with Docker
Create a `Dockerfile` and deploy to any container platform.

### Export as Static Site
```bash
npm run build
npm run export
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [ESLint Documentation](https://eslint.org/docs/rules/)

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Clear cache and reinstall
```bash
rm -r node_modules package-lock.json
npm install
```

### Git errors after setup
The repository is already initialized. To reset:
```bash
rm -rf .git
git init
```

## 📄 License

This project is open source and available under the MIT License.

---

**Project Created:** November 8, 2025  
**Setup Tool:** create-next-app@latest  
**Location:** `c:\Users\AFIFA\Downloads\JSquare\movie`
