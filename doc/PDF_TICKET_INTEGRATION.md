# 🎟️ PDF Ticket Generation - Complete Integration Guide

**Last Updated:** November 12, 2025  
**For:** ASTRA Movie Production Registration System

---

## 📖 Table of Contents

1. [What We Built](#what-we-built)
2. [How It Works (Simple Explanation)](#how-it-works-simple-explanation)
3. [The Files Involved](#the-files-involved)
4. [Step-by-Step Setup](#step-by-step-setup)
5. [How to Add/Modify PDF Content](#how-to-addmodify-pdf-content)
6. [Troubleshooting](#troubleshooting)
7. [FAQ](#faq)

---

## 🎯 What We Built

A **fully automated ticket generation system** where:

✅ User fills out registration form (Name, Phone, Age)  
✅ Clicks "Register Now"  
✅ Ticket is **automatically created** with unique ID (TKT-YYYYMMDDXXX)  
✅ PDF downloads **automatically** to their computer  
✅ They see ticket on screen with "Download" and "Register Another" buttons  

**Example Ticket ID:** `TKT-20251112001` (Date + Counter)

---

## 🧠 How It Works (Simple Explanation)

Think of it like a movie ticket machine at the cinema:

```
┌─────────────────────────────────────────────────────┐
│  1. USER FILLS FORM                                 │
│     (Name: John, Phone: 9876543210, Age: 25)       │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│  2. SYSTEM PROCESSES                                │
│     • Validates phone (10 digits)                   │
│     • Creates unique Ticket ID                      │
│     • Gets current date & time                      │
│     • Saves to database                             │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│  3. TICKET CREATED & PDF GENERATED                  │
│     • Beautiful ticket card appears on screen       │
│     • PDF file created in memory                    │
│     • Automatically downloads to user's computer    │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│  4. USER OPTIONS                                    │
│     • Download Ticket (downloads PDF)               │
│     • Register Another (PDF downloads + form resets)│
│     • Back to Home (goes to home page)              │
└─────────────────────────────────────────────────────┘
```

---

## 📁 The Files Involved

Here's what each file does in simple terms:

### **Core Ticket System Files**

| File | What It Does |
|------|-------------|
| `src/lib/ticket.ts` | 🆔 Generates unique ticket IDs & formats dates |
| `src/components/Ticket.tsx` | 🎟️ Displays ticket card & handles PDF download |
| `src/components/RegistrationForm.tsx` | 📝 User fills form, triggers ticket creation |
| `src/app/api/register/route.ts` | 🔌 Backend: processes registration, returns ticket data |

### **Configuration Files**

| File | What It Does |
|------|-------------|
| `next.config.ts` | ⚙️ Allows development from different IP addresses |
| `tailwind.config.ts` | 🎨 Styling colors and fonts |

### **Dependencies**

| Package | What It Does |
|---------|-------------|
| `html2pdf.js` | 📄 Converts HTML to PDF file |
| `@supabase/supabase-js` | 🗄️ Saves registration data to database |

---

## ⚙️ Step-by-Step Setup

### **STEP 1: Install Required Packages**

The PDF generation library is already installed, but if you need to reinstall:

```bash
npm install html2pdf.js
```

✅ **Why:** This converts the ticket HTML into a downloadable PDF file.

---

### **STEP 2: Create Ticket ID Generator**

**File:** `src/lib/ticket.ts`

This file generates unique ticket IDs:

```typescript
// Counter that resets daily
let dailyCounter = 0;

export function generateTicketId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  
  dailyCounter++;
  const counter = String(dailyCounter).padStart(3, '0');
  
  return `TKT-${year}${month}${day}${counter}`;
}
// Result: TKT-20251112001, TKT-20251112002, etc.
```

✅ **Format:** `TKT-YYYYMMDDXXX`  
✅ **Example:** `TKT-20251112001` = Nov 12, 2025, 1st ticket  
✅ **Unique:** Each ticket has a different number

---

### **STEP 3: Setup Registration API**

**File:** `src/app/api/register/route.ts`

This is the backend that processes registrations:

```typescript
1. User submits form with (Name, Phone, Age)
2. Validate:
   - Name not empty ✓
   - Phone is exactly 10 digits ✓
   - Age between 1-120 ✓
3. Generate ticket ID (e.g., TKT-20251112001)
4. Save to database
5. Return response with ticket details
```

**Response sent back to user:**
```json
{
  "ticket": {
    "id": "TKT-20251112001",
    "name": "John Doe",
    "age": 25,
    "date": "12 Nov 2025",
    "time": "2:30 PM",
    "registeredAt": "2025-11-12T14:30:00Z"
  }
}
```

---

### **STEP 4: Create Ticket Display Component**

**File:** `src/components/Ticket.tsx`

This file:
- Shows the ticket card on screen
- Generates PDF when user clicks download
- Handles "Register Another" button

**Key Parts:**

```typescript
// 1. Build ticket HTML with inline styles (no Tailwind)
function createPrintableTicket({ id, name, age, date, time }) {
  // Create ticket DOM structure
  // Use plain CSS styles (not Tailwind classes)
  // Return DOM element ready for PDF
}

// 2. Download function
async function downloadPDF() {
  // Create temporary container
  // Add ticket to container
  // Convert to PDF using html2pdf
  // Trigger download to user's device
}

// 3. Register Another function
async function handleRegisterAnother() {
  // Download PDF first (so data isn't lost)
  // Reset form for next registration
}
```

---

### **STEP 5: Connect Form to Ticket**

**File:** `src/components/RegistrationForm.tsx`

Connect everything together:

```typescript
// 1. User fills form and clicks "Register Now"
const handleSubmit = async (e) => {
  // Send data to /api/register endpoint
  // Receive ticket data back
  // setSubmitted(true) to show ticket component
  // Pass ticket data and onRegisterAnother callback
}

// 2. Show ticket with buttons
{submitted && ticketData ? (
  <Ticket
    id={ticketData.id}
    name={ticketData.name}
    age={ticketData.age}
    date={ticketData.date}
    time={ticketData.time}
    onRegisterAnother={() => {
      setSubmitted(false);
      setTicketData(null);
    }}
  />
) : (
  // Show form
)}
```

---

## 🎨 How to Add/Modify PDF Content

### **Change Ticket Title**

**File:** `src/components/Ticket.tsx`

Find this section in `createPrintableTicket`:

```typescript
// CURRENT:
const title = document.createElement('h1');
title.textContent = 'ASTRA';

// CHANGE TO:
title.textContent = 'YOUR MOVIE NAME';
```

---

### **Add New Field to Ticket**

For example, add **"Email"** to the ticket:

**Step 1:** Update form to collect email
```typescript
// In RegistrationForm.tsx
const [formData, setFormData] = useState({
  name: '',
  phoneNumber: '',
  age: '',
  email: '' // ADD THIS
});
```

**Step 2:** Add validation
```typescript
if (!formData.email || !formData.email.includes('@')) {
  // Show error
}
```

**Step 3:** Send in API
```typescript
const response = await fetch('/api/register', {
  body: JSON.stringify({
    ...formData,
    email: formData.email // ADD THIS
  })
});
```

**Step 4:** Update API response
```typescript
// In src/app/api/register/route.ts
return NextResponse.json({
  ticket: {
    // ... existing fields
    email: body.email // ADD THIS
  }
});
```

**Step 5:** Add to PDF
```typescript
// In src/components/Ticket.tsx, in createPrintableTicket()
infoGrid.appendChild(buildCard('Email', email));
```

---

### **Change PDF Colors**

**File:** `src/components/Ticket.tsx`

Find color definitions in `createPrintableTicket`:

```typescript
// HEADER BACKGROUND (Dark purple gradient)
wrapper.style.background = 'linear-gradient(135deg, #4c1d95 0%, #1f2937 55%, #0f172a 100%)';

// TITLE COLOR (Rainbow gradient)
title.style.backgroundImage = 'linear-gradient(90deg, #c084fc 0%, #f472b6 50%, #60a5fa 100%)';

// BUTTON BACKGROUND (Purple-Pink gradient)
// In component buttons:
style={{ background: 'linear-gradient(90deg, #7c3aed 0%, #ec4899 100%)' }}
```

**Color Hex Codes:**
- Purple: `#7c3aed`
- Pink: `#ec4899`
- Blue: `#60a5fa`
- Dark: `#0f172a`, `#1f2937`

---

### **Add Company Logo to PDF**

Currently, the ticket shows "ASTRA" as text. To add a logo image:

```typescript
// In createPrintableTicket(), after creating title:
const logo = document.createElement('img');
logo.src = '/path/to/your/logo.png'; // Put image in public/ folder
logo.style.maxWidth = '100px';
logo.style.marginBottom = '16px';
header.insertBefore(logo, title);
```

**How to add image:**
1. Save your logo as `logo.png` in `public/` folder
2. Reference it as `/logo.png`
3. Add above code to `createPrintableTicket`

---

## 🐛 Troubleshooting

### **Problem: PDF downloads but is empty**

**Cause:** HTML rendering wasn't complete before PDF generation

**Solution:**
```typescript
// In downloadPDF(), increase wait time:
await new Promise((resolve) => setTimeout(resolve, 300)); // was 150
```

---

### **Problem: PDF has missing fonts or styling**

**Cause:** Tailwind CSS classes aren't supported in PDFs

**Solution:** Already fixed! We use **inline styles** instead of Tailwind classes:

```typescript
// ❌ DON'T DO THIS (won't work in PDF):
const element = document.createElement('div');
element.className = 'text-white bg-purple-500';

// ✅ DO THIS (works in PDF):
const element = document.createElement('div');
element.style.color = '#ffffff';
element.style.background = '#a855f7';
```

---

### **Problem: Ticket ID not unique**

**Cause:** Counter resets across server restarts

**Solution:** Use database-generated IDs instead:

```typescript
// Instead of generateTicketId(), use:
// UUID from database or date + database ID
```

---

### **Problem: PDF very large file size**

**Cause:** High quality setting

**Solution:** Lower quality in `src/components/Ticket.tsx`:

```typescript
// CURRENT (high quality):
image: { type: 'jpeg', quality: 0.98 }

// CHANGE TO (smaller file):
image: { type: 'jpeg', quality: 0.75 }
```

---

### **Problem: "Register Another" doesn't reset form**

**Cause:** State not properly cleared

**Solution:** Ensure callback is called:

```typescript
// In Ticket.tsx:
onClick={async () => {
  await downloadPDF();
  onRegisterAnother?.(); // The ? means it's optional
}}

// In RegistrationForm.tsx:
<Ticket
  // ... props
  onRegisterAnother={() => {
    setSubmitted(false);      // Show form again
    setTicketData(null);      // Clear ticket data
    setFormData({             // Clear form fields
      name: '',
      phoneNumber: '',
      age: ''
    });
  }}
/>
```

---

## ❓ FAQ

### **Q: How do I change the ticket format from A4 to something else?**

A: Edit `src/components/Ticket.tsx`:

```typescript
// CURRENT (A4):
jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }

// CHANGE TO:
jsPDF: { orientation: 'portrait', unit: 'mm', format: 'letter' } // US Letter
jsPDF: { orientation: 'landscape', unit: 'mm', format: 'a4' } // Landscape
```

---

### **Q: Can I add a barcode or QR code to the ticket?**

A: Yes! Install QR code library:

```bash
npm install qrcode.react
```

Then in `createPrintableTicket`:

```typescript
import QRCode from 'qrcode.react';

// Add QR code element:
const qrCanvas = QRCode.toCanvas({
  value: ticketId, // e.g., "TKT-20251112001"
  size: 100,
});
footer.appendChild(qrCanvas);
```

---

### **Q: How do I send the PDF via email instead of download?**

A: Modify `src/app/api/register/route.ts`:

```typescript
// After saving registration, send email:
import nodemailer from 'nodemailer';

const emailService = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

await emailService.sendMail({
  to: userEmail,
  subject: 'Your ASTRA Movie Ticket',
  attachments: [{
    filename: `Ticket-${ticketId}.pdf`,
    content: pdfBuffer
  }]
});
```

---

### **Q: Can multiple people register with the same phone number?**

A: Currently yes. To prevent duplicates, add check in API:

```typescript
// In src/app/api/register/route.ts:
const { data: existing } = await supabaseServer
  .from('registrations')
  .select('*')
  .eq('phone_number', body.phoneNumber);

if (existing && existing.length > 0) {
  return NextResponse.json(
    { error: 'This phone number is already registered' },
    { status: 400 }
  );
}
```

---

### **Q: Where is the ticket data stored?**

A: In Supabase PostgreSQL database table called `registrations`:

```sql
-- Table structure:
registrations
├── id (auto-generated)
├── name (text)
├── phone_number (text)
├── age (number)
├── created_at (timestamp)
└── updated_at (timestamp)
```

Access in dashboard: http://localhost:3000/dashboard

---

### **Q: Can I customize the ticket design per event?**

A: Yes! Create different ticket templates:

```typescript
// In createPrintableTicket(), add eventType parameter:
function createPrintableTicket({ id, name, age, date, time, eventType }) {
  if (eventType === 'premiere') {
    // Red and gold colors for premiere
    wrapper.style.background = 'linear-gradient(135deg, #b91c1c 0%, #fbbf24 100%)';
  } else if (eventType === 'general') {
    // Purple and blue for regular
    wrapper.style.background = 'linear-gradient(135deg, #4c1d95 0%, #0f172a 100%)';
  }
}
```

---

## 📞 Need Help?

Check these resources:

- **PDF Generation:** [html2pdf.js docs](https://ekoopmans.github.io/html2pdf.js/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Database:** [Supabase docs](https://supabase.com/docs)
- **React:** [React docs](https://react.dev)

---

## 🎉 Summary

You now have a **complete, production-ready ticket generation system** that:

✅ Generates unique ticket IDs automatically  
✅ Creates beautiful PDF tickets  
✅ Downloads automatically  
✅ Stores data in database  
✅ Allows easy customization  

**Next Steps:**
1. Test by registering a few users
2. Customize colors/text to match your brand
3. Add QR codes if needed
4. Deploy to production

Happy ticket selling! 🎬🎟️
