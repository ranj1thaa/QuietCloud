QuietCloud
 A privacy-first journaling, reflection, and vision platform built with modern web technologies.
 QuietCloud is a thoughtfully designed journaling platform that allows users to write, protect, and selectively share their thoughts in a calm, distraction-free environment. It focuses on privacy, emotional safety, and intentional sharing, while delivering a smooth, animated, and modern user experience.

Key Features
1. 🔐 Authentication & User Management
    Firebase Authentication
    Secure login & signup
    Email verification
    Context-based auth state management

2. 📓 Journaling System
    Create, edit, and delete journal entries
    Rich text journal content
    Journal visibility control:
      Private (only visible to owner)
      Public (discoverable by others)
      Read-only public journal view

3. 🌍 Public Journal Discovery
    Dashboard showcasing public journals
    Swiper-based carousel for browsing
    Preview of journal subject, content snippet, and date
    Smooth GSAP animations for cards and transitions
   
4. 🎨 UI / UX Experience
    Calm, minimal, psychology-aware interface
    Responsive design (mobile + desktop)
    Subtle animations using GSAP
    Bootstrap + Tailwind hybrid styling
    Focused on readability and emotional safety

5. 📊 Dashboard Experience
    Personalized greeting
    Public journal feed
    Modular dashboard architecture (Dashboard1, future extensibility)

6. 🧠 Standout Design Decisions
    Privacy-first architecture: Journals are private by default
    Emotionally calm UI instead of aggressive social-feed design
    Read-only public sharing (no edits, no pressure)
    Subtle motion to enhance experience, not distract
    Clean separation of logic using Context API

Tech Stack
  Frontend
    React 19
    React Router DOM
    React Context API
    React Bootstrap
    Tailwind CSS
    GSAP + @gsap/react
    Swiper.js

  Backend / Services
    Firebase Authentication
    Firebase Firestore (for journal storage)
    Utilities
    bcryptjs
    react-toastify
    react-icons

Implementation Overview
Auth state managed globally via Context API
Journal data fetched conditionally after auth
Visibility filtering done at component level
Animations triggered using useGSAP
Carousel-based rendering for public journals
Navigation handled using React Router

Future Enhancements
Encrypted journal content
Time-locked future journals
Journal analytics & mood tracking
Search & tagging system
Progressive Web App (PWA)
