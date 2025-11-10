# 🚀 Quick Commands Reference

## Initial Setup (First Time Only)

```bash
# Navigate to project
cd movie

# Install all dependencies
npm install

# Install Supabase
npm install @supabase/supabase-js

# Create .env.local file (add your credentials)
# Copy the credentials from Supabase dashboard

# Create registrations table in Supabase SQL Editor
# (See README.md for SQL command)
```

---

## Running the Project

```bash
# Start development server
npm run dev

# Opens at http://localhost:3000
```

---

## Useful URLs

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| Register | http://localhost:3000/register |
| Dashboard | http://localhost:3000/dashboard |

---

## Development Commands

```bash
# Start dev server with auto-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check code quality
npm run lint

# Fix linting issues
npm run lint --fix
```

---

## Troubleshooting Commands

```bash
# Kill process on port 3000
npx kill-port 3000

# Clear node modules and reinstall
rm -r node_modules package-lock.json
npm install

# Clear Next.js cache
rm -r .next

# Run dev again
npm run dev
```

---

## Environment Variables

File: `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_secret
```

**Note:** Only edit `.env.local` - never commit to GitHub!

---

## Database Commands (Supabase SQL Editor)

```sql
-- View all registrations
SELECT * FROM registrations ORDER BY created_at DESC;

-- Count total registrations
SELECT COUNT(*) FROM registrations;

-- Get registration by ID
SELECT * FROM registrations WHERE id = 1;

-- Delete a registration
DELETE FROM registrations WHERE id = 1;
```

---

## Project Structure

```
movie/
├── src/
│   ├── app/
│   │   ├── page.tsx              (Home - Hero section)
│   │   ├── register/
│   │   │   └── page.tsx          (Register page with form)
│   │   ├── dashboard/
│   │   │   └── page.tsx          (Dashboard - view registrations)
│   │   └── api/
│   │       └── register/
│   │           └── route.ts      (API - handles form submission)
│   ├── components/
│   │   ├── Hero.tsx              (Hero section)
│   │   └── RegistrationForm.tsx  (Registration form)
│   └── lib/
│       └── supabase.ts           (Supabase client setup)
├── .env.local                    (Your credentials - DO NOT COMMIT)
├── README.md                     (Main documentation)
└── package.json                  (Dependencies)
```

---

## Form Validation

The registration form validates:
- ✅ Name - Required, text only
- ✅ Phone - Required, exactly 10 digits (Indian)
- ✅ Age - Required, number between 1-120

---

## API Response Examples

### Successful Registration (POST)
```json
{
  "success": true,
  "message": "Registration submitted successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "phone_number": "9876543210",
    "age": 25,
    "created_at": "2025-11-10T10:30:45.123Z"
  }
}
```

### Get All Registrations (GET)
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "phone_number": "9876543210",
      "age": 25,
      "created_at": "2025-11-10T10:30:45.123Z"
    }
  ]
}
```

---

## 🆘 Need Help?

1. Check console for errors: Open DevTools (F12) → Console tab
2. Check Network tab to see API responses
3. Verify `.env.local` has correct credentials
4. Check Supabase dashboard to see if data is saved
5. Read `BACKEND_INTEGRATION_GUIDE.md` for detailed explanation

---

**Last Updated:** November 10, 2025
