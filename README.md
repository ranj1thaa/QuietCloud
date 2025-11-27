QuietCloud — Your Quiet Space in a Noisy World
A secure and beautiful journaling platform built with React, Firebase, GSAP.

Overview
QuietCloud is a modern, secure, feature-rich journaling application designed to help users document their thoughts privately and explore public journals from the community.
It focuses on privacy, smooth UI animation, beautiful charts, and an immersive writing experience.

Key Features

1. Authentication & Security
   Firebase Email/Password login
   Google Sign-In
   Protected routes (unauthenticated users cannot access dashboard or journals)  
   4-digit PIN system for private journals
   PINs are hashed using bcryptjs and stored securely
   PIN change option with old/new PIN verification
   Logout button in navbar

2. Journaling System
   Create journals with:
   Title
   Journal content
   “Future-self” message
   Mood selection
   Rating the day
   What you learned
   What you want to improve
   "Allow Public" will let all users to see
   Swiper-powered journal viewer
   Create public message
   Journals displayed in ascending date order
   Search by:
   Title
   Mood
   Rating
   Date
   Sort journals ASC / DESC
   Delete journals
   Open journal (read-only view)
   Edit journal screen
   Journal Lock button → redirects to PIN entry

3. Journal Analytics (Chart.js)
   Beautiful and interactive analytics:
   Mood Count Bar chart
   Mood Trend Over Time (multi-line chart)
   Rating Trend (smooth tensioned line chart)
   Entries Per Month bar chart

4. Dashboard (Home)
   Public Journals (read-only and anyone can view)
   Articles section with search
   Quote section (single inspirational image)
   Community Messages area (all users can see messages)
   Community Blogs:
   Read any blog
   Write a new blog

5. UI & Motion
   GSAP animations:
   ScrollTrigger
   Timeline sequences
   MotionPath animations
   React Bootstrap + TailwindCSS styling
   Responsive layout
   Typewriter taglines using react-type-animation
   Swiper for interactive content sections

Tech Stack

1. Frontend
   React 19
   React Router v7
   React Bootstrap
   TailwindCSS
   Swiper
   React Icons
   Animation
   GSAP
   @gsap/react
   MotionPathPlugin

2. Data & Auth
   Firebase Authentication
   Firebase Firestore
   bcryptjs (PIN hashing)

3. Charts
   Chart.js
   react-chartjs-2

4. UI/UX
   react-toastify
   react-type-animation

Project Structure (Important Folders)
src/
│── components/
│── pages/
│── context/
└── service/

⚙️ Installation & Setup

1. Clone the repo
   git clone https://github.com/<your-username>/quiet-cloud.git
   cd quiet-cloud

2️⃣ Install dependencies
npm install

3️⃣ Add Firebase config
Inside:
src/firebase/config.js

Add your Firebase API keys.
4️⃣ Start development server
npm run dev

5️⃣ Build for production
npm run build

6️⃣ Preview the production build
npm run preview

🔥 Firebase Security Rules (recommended)
service cloud.firestore {
match /databases/{database}/documents {

    // Public Journals (readable by anyone)
    match /publicJournals/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Private Journals
    match /privateJournals/{id} {
      allow read, write, update, delete: if request.auth != null
        && request.auth.uid == resource.data.ownerId;
    }

    // Blogs & Messages
    match /blogs/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /messages/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }

}
}

🚀 Deployment (Vercel Recommended)
Deploy to Vercel:

Push project to GitHub

Go to https://vercel.com

Import GitHub repo

Framework: Vite

Add Firebase env keys (if any)

Deploy 🎉

Vercel will automatically rebuild on every GitHub push.

🧠 Future Improvements (Optional Ideas)

Export journal as PDF

Dark mode / custom themes

AI-powered mood suggestions

Journal streak tracking

Backup/restore via Google Drive

Daily reminder notifications

❤️ About QuietCloud
QuietCloud was created to give users a calm personal space online — a private digital sanctuary for thoughts, reflection, and growth.
If you like the project, ⭐ please star the repository on GitHub!

📸 Screenshots
(Add later — I can format them for you if you send images.)

📜 License
MIT License — free to use, modify, and build upon.
