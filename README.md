# Online Assessment System

🔗 **[GitHub Repository](https://github.com/shuvo794/online-assessment)** | ✨ **[Live Demo](https://online-assessment-beta.vercel.app)** | 🎥 **[Demo Video](https://drive.google.com/file/d/1ESGoKvYVl0NIa_sALT_f5pGuFtgY6voS/view)** 

---

## 📖 Project Overview

A modern, responsive, and dual-layered Online Examination System that manages everything from test creation by employers to a fully timed, interactive exam-taking experience for candidates. Built to ensure test integrity, state persistence, and a seamless UI/UX.

---

## 🛠 Tech Stack

* **Framework**: React 19 & [Next.js 16+ (App Router)](https://nextjs.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Language**: TypeScript
* **State Management**: React Hooks (`useState`, `useEffect`), LocalStorage
* **Routing**: Next Navigation

---

## 🚀 Features (Employer + Candidate)

### Employer Features:
* **Test Management System**: Create, edit, and organize multiple examination sets. Specify the number of questions, points, candidates, and exam durations.
* **Custom MCQ Editor**: An interactive and intuitive Modal Editor to draft questions, add dynamic options, and select correct answers natively.
* **Role-based Dashboard**: Secure access to the Management Dashboard (`/dashboard`).

### Candidate Features:
* **Interactive Exam Interface**: Clean, user-friendly test-taking mode with smooth navigation, check-marked selected states, and warning indicators.
* **Real-time Exam Timer**: Ensures test integrity. The countdown timer runs accurately and automatically flags timeouts.
* **Auto-Submission & Redirection**: Auto-submits and redirects to a success or a timeout page according to exam timeline bounds.
* **Persistent States**: Utilizes modern client-side storage to keep exam states persistent across reloads.
* **Fully Responsive**: Crafted with mobile-first design to ensure a seamless UI/UX on Android, iOS, tablets, and Desktop computers.

---

## 💻 Setup Instructions

To run this project on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shuvo794/online-assessment.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd online-assessment
   ```

3. **Install the dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser.

### Demo Credentials
* **Employer:** `admin@gmail.com` / `1234`
* **Candidate:** `user@gmail.com` / `1234`

---

## 📝 Answers to Questions

### MCP
**Model Context Protocol (MCP)** is an open standard that enables AI models to securely access and interact with local and remote resources. In the development of this application, MCP allowed the AI assistant to read the active workspace, track the terminal, and quickly debug server-side mismatch issues by viewing complete architectural state at once. 

### AI Tools
This project was developed with the assistance of an advanced AI coding assistant (Google DeepMind's Antigravity leveraging Gemini). AI tools were instrumental in rapidly prototyping the Tailwind CSS UI, scaffolding out the Next.js App Router flows, solving complex hydration errors (such as SSR vs Client discrepancies), and implementing reliable time-tracking features.

### Offline Mode
The test-taking experience utilizes **LocalStorage** heavily to maintain a persistent state. If a candidate temporarily loses their internet connection, their selected options, current elapsed time, and navigation progress are kept safely in memory on their device. Upon coming back online, they can safely resume or submit without losing progress. While the app isn't a full offline PWA out-of-the-box, its client-centric design ensures high durability against sudden network drops.
