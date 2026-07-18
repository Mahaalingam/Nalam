<div align="center">

# 🩺 Nalam

### Smart Pre-Consultation Platform for Modern Healthcare

Nalam lets patients submit structured medical information before a doctor's appointment — symptoms, history, medications, and reports — so doctors walk in already informed and consultations focus on care, not intake.

[Live Demo](https://nalam-healthcare.netlify.app) · [Report a Bug](#) · [Request a Feature](#)

</div>

---

## 📖 Overview

The first few minutes of most doctor's visits are spent re-explaining symptoms, digging through old reports, and recalling history under pressure — time taken directly away from diagnosis and care.

**Nalam** closes that gap. Patients complete a structured pre-consultation form before their visit. Doctors receive a clean, organized summary in advance and can review it, add consultation notes, and mark visits complete — all before the patient even walks in the door.

> Nalam does **not** provide medical advice, diagnosis, or treatment recommendations. Every summary reflects only what the patient entered — the goal is better-prepared conversations, not automated medicine.

---

## ✨ Features

### For Patients
- Register, log in, and securely manage an account (with password reset)
- Book appointments through a guided hospital → department → doctor → time-slot flow
- Complete a detailed Smart Pre-Consultation Form (symptoms, history, medications, allergies, lifestyle, document selection, pain-level slider)
- View a structured summary of their own submission
- Track appointment status (Pending / Completed)
- View consultation history and doctor's notes
- Edit profile information and change password

### For Doctors
- Log in to a dedicated dashboard (accounts are provisioned manually, not self-registered)
- View today's appointments and a deduplicated full patient list
- Open any patient's pre-consultation summary before the visit
- Add and save consultation notes
- Mark appointments as completed (with a confirmation step)
- Edit their own professional profile (hospital, department)

### Platform-wide
- Role-based authentication and route protection
- Toast notifications, loading states, and designed empty states throughout
- Fully responsive design (mobile, tablet, desktop)
- Public marketing pages: Landing, About, Features, How It Works, Contact, Privacy Policy, Terms of Service
- Contact form submissions saved to Firestore

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, React Router DOM |
| Styling | Plain CSS — custom design system (CSS variables, no framework) |
| Backend | Firebase Authentication, Firebase Firestore |
| File uploads | Firebase Storage *(integration point built, upload deferred — see [Known Limitations](#-known-limitations))* |
| Testing | Vitest, React Testing Library |
| Hosting | Netlify (deployed from GitHub) |
| Build tool | Vite |

No custom backend server — Firebase covers authentication, database, and (planned) file storage entirely.

---

## 📂 Project Structure

```
src/
├── assets/          # Images, logos
├── components/      # Reusable UI (Navbar, Footer, Button, Modal, Loader, Toast, ProtectedRoute...)
├── pages/           # Route-level screens (Dashboards, Booking, Forms, Profile pages...)
├── context/          # Global state (AuthContext, ToastContext)
├── services/        # All Firestore/Firebase Auth logic, one file per data domain
├── firebase/        # Firebase SDK initialization
├── css/             # Per-feature stylesheets
├── utils/           # Small helper functions
├── test/            # Vitest setup
├── App.jsx          # Route definitions
└── main.jsx         # App entry point, provider setup
```

Each Firestore collection has a dedicated **service file** (`appointmentService.js`, `authService.js`, `preConsultationService.js`, etc.) that owns all reads/writes for it — components never call Firestore directly.

---

## 🗄️ Data Model

| Collection | Purpose |
|---|---|
| `Users` | Patient & doctor profiles, keyed by Firebase Auth UID |
| `Appointments` | Booking details, status, links patient ↔ doctor |
| `PreConsultations` | Submitted intake form data, keyed by appointment ID |
| `DoctorNotes` | Doctor's consultation notes, keyed by appointment ID |
| `ContactMessages` | Public contact form submissions |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A Firebase project with **Authentication** (Email/Password) and **Firestore** enabled

### Installation

```bash
git clone https://github.com/Mahaalingam/Nalam.git
cd Nalam
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Run Locally

```bash
npm run dev
```

### Run Tests

```bash
npm run test
```

### Build for Production

```bash
npm run build
```

---

## 🔐 Firestore Security Rules

The database ships locked down — not open "test mode." Users can only write their own profile; only the patient and doctor tied to an appointment can read or update it; contact messages can be created by anyone but never read back through the client. See `firestore.rules` (or the Firebase Console → Firestore → Rules) for the full ruleset.

---

## ⚠️ Known Limitations

- **File uploads are UI-only.** Firebase Storage requires the paid Blaze plan; rather than block the project on a billing decision, the upload UI and data flow (`FileUpload.jsx`) are fully built, but the actual file-byte upload is stubbed — only the filename is currently saved. Wiring up real uploads is a small, contained change (one new service function + a one-line change in the form's submit handler) once Storage is enabled.
- **Email notifications are not yet implemented.** Booking confirmations and appointment reminders are a planned addition — confirmations are straightforward client-side (e.g. via EmailJS); true scheduled reminders require server-side compute (Firebase Cloud Functions), which also needs the Blaze plan.

---

## 🧪 Testing

A focused test suite covers:
- Pure utility functions (`formatDate`, including edge cases like leap years)
- Core business logic (`filterTodaysAppointments`)
- Component rendering behavior (`Loader`, across its different prop states)

```bash
npm run test
```

---

## 🌐 Deployment

Deployed on **Netlify**, built from this repository. Key deployment details:
- `public/_redirects` routes all paths to `index.html`, so client-side routing (React Router) works correctly on page refresh
- Environment variables are configured directly in Netlify's dashboard (never committed to the repo)
- The live domain is added to Firebase Authentication's authorized domains list

---

## 📄 License

This project was built for educational and portfolio purposes.

---

<div align="center">

Built as a full-stack learning project — React, Firebase, and real-world debugging along the way.

</div>
