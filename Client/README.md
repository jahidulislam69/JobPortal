# Job Portal (Client-Side)

## 🚀 Overview
This is the **frontend** of a MERN-based job portal where users can browse and apply for jobs, while recruiters can manage job postings and applicants. The frontend is built with React and uses **Clerk** for authentication.

## ✨ Features
- **User Authentication:** Secure login/signup using Clerk (Google, email/password).
- **Profile Management:** Users can update profile pictures, settings, and delete accounts.
- **Job Listings:** Browse job posts with search, filtering, and pagination.
- **Apply for Jobs:** View job details and submit applications.
- **CV Upload & Management:** Users can upload, update, and manage CVs.
- **Recruiter Dashboard:** Post new jobs, manage listings, and review applicants.
- **Responsive UI:** Optimized for desktop and mobile.

## 📌 Tech Stack
- **React.js** – Frontend framework
- **React Router** – Navigation management
- **Context API** – Global state management
- **Clerk** – Authentication
- **Axios** – API requests
- **Quill.js** – Rich text editor for job descriptions

## 📂 Project Structure
```
client/
│── src/
│   ├── components/          # Reusable UI components
│   ├── context/             # Global state (AppContext)
│   ├── pages/               # Main pages (Home, ApplyJob, Dashboard, etc.)
│   ├── App.js               # Routes and main structure
│   ├── index.js             # Entry point
│── public/
│── package.json
│── README.md
```

## 🔗 Live Demo
👉 [Job Portal Live](https://jobportalclient-delta.vercel.app/) 

## 🔧 Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/jahidulislam69/JobPortal.git
   ```
2. Navigate to the project folder:
   ```bash
   cd job-portal-client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## 🌟 Frontend Routing (App.js)
```jsx
<Routes>
  <Route path='/' element={<Home/>} />
  <Route path='/apply-job/:id' element={<ApplyJob/>} />
  <Route path='/applications' element={<Applications/>} />
  <Route path='/dashboard' element={<Dashboard/>}>
    <Route path='add-job' element={<AddJob/>} />
    <Route path='manage-jobs' element={<ManageJobs/>} />
    <Route path='view-applications' element={<ViewApplications/>} />
  </Route>
</Routes>
```

## 📜 License
This project is **open-source** and available under the MIT License.

---

> **Note:** This is just the **client-side** README. For the full project (including backend), refer to the main repository.

Happy Coding! 🚀

