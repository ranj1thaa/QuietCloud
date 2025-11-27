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
   git clone https://github.com/ranj1thaa/QuietCloud.git
   cd quiet-cloud

2. Install dependencies
   npm install

3. Add Firebase config
   Inside:
      src/services/Firebase.js

   Add your Firebase API keys.

4. Start development server
   npm run dev

5.  Build for production
   npm run build

6. Preview the production build
npm run preview
