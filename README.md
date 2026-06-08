# SynergyHR — Premium HR Portal & Administration Suite

SynergyHR is a modern, high-fidelity, and feature-rich Human Resources Portal and Dashboard system designed to streamline organization management, recruitment workflows, payroll tracking, and attendance logs. 

Built with **React**, **Vite**, **Tailwind CSS**, and **Recharts**, the application features a polished dark-accented sidebar navigation, responsive layouts, interactive statistics dashboards, and elegant hover animations.

---

## ✨ Features Overview

The workspace contains dedicated panels for key HR operations, organized into logical modules:

### 👥 Staff Management
*   **Employee Directory:** Searchable directory displaying active/inactive employees, roles, departments, and emails.
*   **Onboarding Tracker:** Status board tracking document submission, training, and setup for new hires.
*   **Offboarding Tracker:** Safe-exit checklist for departing team members (asset return, IT access revocation).
*   **Team Hub:** Overview of company departments, team structures, and active leads.

### ⏱️ Attendance & Scheduling
*   **Attendance Dashboard:** Interactive graphs displaying average daily attendance, late arrivals, and absence trends.
*   **Attendance Log:** Searchable and filterable history of employee check-in/out times.
*   **Shift Planner:** Shift schedule overview, shift swaps, and roster configuration.
*   **Overtime & Leaves:** Portal to approve/reject overtime applications and annual/sick leave requests.

### 🎯 Recruitment & Talent Acquisition
*   **Recruitment Dashboard:** Stats on active openings, application volume, and recruitment cost-per-hire.
*   **Candidate Pipeline:** Kanban-style pipeline tracking candidate progress (Applied, Screened, Interviewed, Offered, Hired).
*   **Interviews Schedule:** Calendar view showing upcoming panel interviews, times, and interviewers.
*   **Offer Letters:** Overview of sent, signed, and pending job offer sheets.

### 💰 Payroll & Compensation
*   **Payroll Dashboard:** Visual graphs of month-over-month salary expenses, tax withholdings, and benefits.
*   **Salary Structure:** Component definitions (basic, allowances, deductions) and payroll calculator tools.

---

## 🛠️ Technology Stack

*   **Frontend Core:** React 19, JavaScript (ES6+)
*   **Build Tooling & Bundler:** Vite 8 (with fast Hot Module Replacement)
*   **Styling System:** Tailwind CSS v4 (native `@tailwindcss/vite` integration)
*   **Data Visualization:** Recharts (responsive bar, area, line, and pie charts)
*   **Icons & Assets:** Lucide React (vector-based icon kit)
*   **Linter:** ESLint 10

---

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have **Node.js** (v18 or higher recommended) and **npm** installed.

### 💻 Local Installation
1. Clone this repository to your local machine:
   ```bash
   git clone <repository-url>
   cd new-hr-portal-design
   ```
2. Install the package dependencies:
   ```bash
   npm install
   ```

### 🏃‍♂️ Running the App
*   **Development Server:** Start the Vite dev server with HMR:
    ```bash
    npm run dev
    ```
    Open your browser and navigate to `http://localhost:5173` (or the URL shown in your terminal).

*   **Production Build:** Compile and minify the application for production deployment:
    ```bash
    npm run build
    ```
    This generates optimized static files in the `/dist` directory.

*   **Preview Production:** Preview the built production assets locally:
    ```bash
    npm run preview
    ```

*   **Linter Check:** Run ESLint checks to scan for code issues:
    ```bash
    npm run lint
    ```
