<img width="1440" height="811" alt="Screenshot 2025-11-28 at 1 54 13 AM" src="https://github.com/user-attachments/assets/8657def0-bc10-4570-a5a4-3a5e90b46eba" />QuietCloud — Your Quiet Space in a Noisy World
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


ScreenShots:
<img width="1440" height="811" alt="Screenshot 2025-11-28 at 1 54 13 AM" src="https://github.com/user-attachments/assets/252eabae-109c-4992-bd2b-ef87c6f93742" />

<img width="1440" height="811" alt="Screenshot 2025-11-28 at 1 54 43 AM" src="https://github.com/user-attachments/assets/b468eb8d-c0c9-47c6-8f5a-03b3ce32ffac" />

<img width="1440" height="811" alt="Screenshot 2025-11-28 at 1 54 58 AM" src="https://github.com/user-attachments/assets/c564477a-fb86-4c5e-9a3c-b825dc45cf8d" />

<img width="1440" height="811" alt="Screenshot 2025-11-28 at 1 55 22 AM" src="https://github.com/user-attachments/assets/0a5b5e9d-b1a9-473f-90c8-12df6d256feb" />

<img width="1440" height="811" alt="Screenshot 2025-11-28 at 1 55 31 AM" src="https://github.com/user-attachments/assets/db9a750f-36f8-4b89-b353-7c8c62e9aca4" />

<img width="1440" height="811" alt="Screenshot 2025-11-28 at 1 55 41 AM" src="https://github.com/user-attachments/assets/b0b646bd-8b87-4f17-a9e1-33fd1d8f8e5a" />

<img width="1440" height="811" alt="Screenshot 2025-11-28 at 1 55 50 AM" src="https://github.com/user-attachments/assets/0b5dcd13-f833-44c7-9a25-e1ef25b02a1b" />

<img width="1440" height="811" alt="Screenshot 2025-11-28 at 1 55 53 AM" src="https://github.com/user-attachments/assets/a1295334-24df-40a9-963c-7a1635072b56" />

<img width="1440" height="811" alt="Screenshot 2025-11-28 at 1 54 58 AM" src="https://github.com/user-attachments/assets/d152db7f-894d-4860-bad4-840e2c64ea2b" />

<img width="1440" height="811" alt="Screenshot 2025-11-28 at 1 58 26 AM" src="https://github.com/user-attachments/assets/bc1e936d-74eb-4751-baa9-5d9d5b4bf0cf" />

<img width="1440" height="811" alt="Screenshot 2025-11-28 at 1 58 32 AM" src="https://github.com/user-attachments/assets/5499e29a-52cb-4f0a-9f71-d082e307f026" />

<img width="1440" height="811" alt="Screenshot 2025-11-28 at 1 58 43 AM" src="https://github.com/user-attachments/assets/ae1b0d89-d21a-4415-b614-59de4a102ec6" />



