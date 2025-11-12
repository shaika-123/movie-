# Supabase Backend Integration Guide

## 🎯 What I Did

I connected your ASTRA Movie Production app to Supabase database so all registrations are now stored securely in the cloud instead of local JSON files.

---

## 📋 Step-by-Step Integration Process

### **Step 1: Installed Supabase Client**

```bash
npm install @supabase/supabase-js
```

**What this does:**
- Adds Supabase JavaScript library to your project
- Allows communication between your Next.js app and Supabase database

---

### **Step 2: Created Environment Variables (`.env.local`)**

Created a `.env.local` file with your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://yseohditolnwkmosqrzq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Why two different keys?**
- **ANON_KEY** (Public) - Used in browser for public operations
- **SERVICE_ROLE_KEY** (Secret) - Used on server for admin operations
- `NEXT_PUBLIC_` prefix means it's exposed to browser (safe for public key)

**Security:**
- `.env.local` is in `.gitignore` - never committed to GitHub
- Only runs on your machine and server

---

### **Step 3: Created Supabase Client Utility**

**File:** `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

// Client-side (browser)
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server-side (API routes)
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
```

**Why?**
- Centralizes Supabase connection configuration
- `supabaseClient` for browser (form submissions)
- `supabaseServer` for API routes (backend operations)
- Easy to import anywhere in your app: `import { supabaseServer } from '@/lib/supabase'`

---

### **Step 4: Updated API Route (`/api/register`)**

**Changed from:** Saving to JSON file locally  
**Changed to:** Saving to Supabase database

**Key Changes:**

```typescript
// OLD - JSON File
await writeFile(filePath, JSON.stringify(registrations));

// NEW - Supabase
const { data, error } = await supabaseServer
  .from('registrations')
  .insert([
    {
      name: body.name,
      phone_number: body.phoneNumber,
      age: age,
    },
  ])
  .select();
```

**What the new code does:**
1. Takes form data (name, phone, age)
2. Validates it (checks phone is 10 digits, age is 1-120)
3. Inserts into Supabase `registrations` table
4. Returns success/error response

**Benefits:**
- Data persists in cloud database (secure)
- Accessible from any device
- Can scale to millions of users
- Better performance than file I/O

---

### **Step 5: Updated Dashboard**

**Changed from:** Reading JSON file  
**Changed to:** Fetching from Supabase

```typescript
// OLD - Read file
const fileContent = await readFile(filePath, 'utf-8');
const registrations = JSON.parse(fileContent);

// NEW - Query Supabase
const { data, error } = await supabaseServer
  .from('registrations')
  .select('*')
  .order('created_at', { ascending: false });
```

**Also updated field names:**
- `phoneNumber` → `phone_number` (Supabase column name)
- `age: string` → `age: number` (proper type)
- `submittedAt` → `created_at` (Supabase timestamp)

---

## 🏗️ Architecture Overview

```
┌─────────────────┐
│   User Browser  │
│  (React Form)   │
└────────┬────────┘
         │
         │ POST /api/register
         │ (form data)
         ↓
┌─────────────────────┐
│  Next.js API Route  │
│  (/api/register)    │
│  - Validates data   │
│  - Inserts to DB    │
└────────┬────────────┘
         │
         │ Supabase Client
         │ (SERVICE_ROLE_KEY)
         ↓
┌─────────────────────────┐
│   Supabase Database     │
│  - Cloud PostgreSQL     │
│  - registrations table  │
│  - Stores all data      │
└─────────────────────────┘
```

---

## 📊 Data Flow

### **When User Registers:**

1. User fills form: Name, Phone, Age
2. Clicks "Register Now" button
3. Browser sends POST request to `/api/register`
4. API validates:
   - All fields present
   - Phone is exactly 10 digits
   - Age is 1-120
5. Supabase inserts data into table
6. Success message shown to user
7. Form clears for next registration

### **When Dashboard Loads:**

1. Dashboard component mounts
2. Fetches from `/api/register` (GET)
3. API queries Supabase database
4. Returns all registrations sorted by latest first
5. Dashboard displays:
   - Total count
   - Latest registration date
   - Average age
   - Table of all registrations

---

## 🔄 File Structure

```
movie/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── register/
│   │   │       └── route.ts          ← Updated: Now uses Supabase
│   │   ├── dashboard/
│   │   │   └── page.tsx              ← Updated: Fetches from Supabase
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   ├── Hero.tsx
│   │   └── RegistrationForm.tsx      ← Unchanged: API handles it
│   └── lib/
│       └── supabase.ts               ← NEW: Supabase client config
├── .env.local                        ← NEW: Your credentials
├── package.json
└── ...
```

---

## 🔑 Environment Variables Explained

### `NEXT_PUBLIC_SUPABASE_URL`
- Your Supabase project URL
- Public - safe to expose in browser
- Used by: Browser & API routes
- Format: `https://xxxxx.supabase.co`

### `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Public anonymous key
- Allows unauthenticated operations
- Used by: Browser
- Protected by RLS (Row Level Security) policies

### `SUPABASE_SERVICE_ROLE_KEY`
- Secret admin key - NEVER expose to browser
- Full database access
- Used by: API routes only (server-side)
- Only stored in `.env.local` (not in browser)

---

## ✅ Testing the Integration

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Test registration:**
   - Go to http://localhost:3000
   - Click "Register" or "Claim Scanner"
   - Fill form: Name, Phone (10 digits), Age
   - Click "Register Now"
   - You should see "Registration Successful!"

3. **Check Supabase:**
   - Go to Supabase Dashboard
   - Click "Table Editor"
   - Click "registrations" table
   - You should see your entry with:
     - `id` (auto-generated)
     - `name` (your input)
     - `phone_number` (your input)
     - `age` (your input)
     - `created_at` (timestamp)

4. **View dashboard:**
   - Go to http://localhost:3000/dashboard
   - Should show your registration in the table

---

## 🐛 Troubleshooting

### "Table 'registrations' does not exist"
- Make sure you created the table in Supabase
- Refer to SUPABASE_SETUP.md for SQL commands

### "Invalid API key"
- Check `.env.local` has correct keys
- Restart `npm run dev` after adding `.env.local`

### "Cannot read properties of undefined"
- Make sure Supabase credentials are set
- Check Network tab in DevTools to see error details

### Registration not appearing in dashboard
- Check browser console for errors
- Check Network tab to see API response
- Verify Supabase table exists and has data

---

## 🚀 Next Steps You Can Do

1. **Add authentication:**
   - Users login before registering
   - Track who registered

2. **Add email notifications:**
   - Send confirmation email when registered
   - Admin gets notified of new registrations

3. **Add CSV export:**
   - Export all registrations to Excel
   - Useful for reporting

4. **Add delete/edit:**
   - Admins can manage registrations
   - Edit or remove invalid entries

5. **Add filters:**
   - Filter by date range
   - Search by name or phone

---

## 📚 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [PostgreSQL Basics](https://www.postgresql.org/docs/current/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

## ✨ Summary

Your app now has:
- ✅ Cloud database (Supabase PostgreSQL)
- ✅ Secure API endpoints
- ✅ Data persistence
- ✅ Admin dashboard
- ✅ Form validation
- ✅ Error handling
- ✅ Professional infrastructure

**Everything is set up and ready to use!** 🎉
