# Supabase Setup Guide for ASTRA Movie Production

## 1. Create Supabase Project

### Step 1: Go to Supabase
- Visit: https://supabase.com
- Sign up or log in

### Step 2: Create New Project
- Click "New Project"
- Choose organization
- Fill in project details:
  - **Name**: astra-movie
  - **Database Password**: (choose strong password - save it!)
  - **Region**: Choose closest to you (e.g., Asia Pacific)
- Click "Create new project" and wait for setup

### Step 3: Get Your Credentials
After project is created, go to **Project Settings** → **API**:
- Copy: `Project URL` → Save as `NEXT_PUBLIC_SUPABASE_URL`
- Copy: `anon` public key → Save as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 2. Create Registration Table

### Using Supabase Dashboard (Easy Way)

1. Go to **SQL Editor** in Supabase dashboard
2. Click **New Query**
3. Copy and paste this SQL:

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

-- Create index on phone_number for faster queries
CREATE INDEX idx_registrations_phone ON registrations(phone_number);

-- Enable RLS (Row Level Security)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public signup)
CREATE POLICY "Allow public insert" ON registrations
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read (for admin dashboard - optional)
CREATE POLICY "Allow public read" ON registrations
  FOR SELECT
  USING (true);
```

4. Click **Run** button
5. Wait for success message

---

## 3. Alternative: Using SQL Command Line

If you prefer command line:

```bash
# Connect to your Supabase database
psql postgresql://postgres:[PASSWORD]@[PROJECT-ID].supabase.co:5432/postgres

# Then paste the SQL from above
```

---

## 4. Verify Table Creation

In Supabase Dashboard:
1. Go to **Table Editor**
2. You should see `registrations` table
3. Click on it to verify columns:
   - `id` (bigint, primary key)
   - `name` (text)
   - `phone_number` (text)
   - `age` (integer)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

---

## 5. Environment Variables Setup

Create `.env.local` file in your Next.js project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Where to get these:**
- `NEXT_PUBLIC_SUPABASE_URL` → Project Settings → API → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Project Settings → API → anon (public)
- `SUPABASE_SERVICE_ROLE_KEY` → Project Settings → API → service_role (secret)

---

## 6. Install Supabase Client

Run in your project:

```bash
npm install @supabase/supabase-js
```

---

## Table Structure

| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Unique identifier (auto-generated) |
| name | VARCHAR(255) | User full name |
| phone_number | VARCHAR(20) | 10-digit Indian phone number |
| age | INT | User age |
| created_at | TIMESTAMP | Registration timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

---

## SQL Queries You'll Use

### Insert Registration
```sql
INSERT INTO registrations (name, phone_number, age)
VALUES ('John Doe', '9876543210', 25)
RETURNING *;
```

### Get All Registrations
```sql
SELECT * FROM registrations
ORDER BY created_at DESC;
```

### Get Registration by ID
```sql
SELECT * FROM registrations
WHERE id = 1;
```

### Count Total Registrations
```sql
SELECT COUNT(*) FROM registrations;
```

### Delete Registration
```sql
DELETE FROM registrations
WHERE id = 1;
```

---

## Next Steps

After table creation:
1. Update API route (`/api/register/route.ts`) to use Supabase
2. Update RegistrationForm to send data to Supabase
3. Update Dashboard to fetch from Supabase
4. Test the complete flow

Let me know when table is created and I'll help update the backend! 🚀
