--------PROJECT NAME--------

Task Manager Web Application





-------DESCRIPTION----------

Simple and clean full-stack Task Manager web app built with Vite + React on the frontend and Node.js + Express on the backend. 
It allows you to create, edit, and delete tasks — perfect for small personal productivity or developer demo projects.





---------FEATURES----------

Create new tasks with title, description, status, and due date

- Edit existing tasks
- Delete tasks
- Real-time updates after add/edit/delete
- Status tags: To Do, In Progress, Done
- Clean and responsive UI
- Fast frontend with Vite
- In-memory backend storage (no database needed)





---------PROJECT STRUCTURE-----------


task-manager/
├── backend/               # Express API
│   ├── index.js
│   ├── routes/tasks.js
│   └── utils/storage.js
│
├── frontend/              # Vite + React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── api.js
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskForm.css
│   │   └── pages/
│   │       ├── Home.jsx
│   │       ├── AddTask.jsx
│   │       ├── EditTask.jsx
│   │       └── styles.css
│   └── vite.config.js
│
├── README.md
└── package.json           # Optional: root scripts with concurrently





-----------DEVELOPMENT PROCESS------------

Frontend (Vite + React)

1. Bootstrapped using Vite:
   
   npm create vite@latest frontend --template react
   
   cd frontend
   
   npm install
   
   npm install react-router-dom


3. Pages/Components:

   /home displays tasks
   
   /add renders TaskForm for new task
   
   /edit/:id uses same TaskForm to edit
   
   State is handled with useState, useEffect, and useNavigate

5. API:

   Calls handled via a custom api.js file
   
   Proxy configured in vite.config.js to avoid CORS

7. Styling:

   Pure CSS (no external UI libraries)
   
   Responsive layout
   
   Centered form and task cards



Backend (Node.js + Express)

1. Initialized:

   cd backend
   
   npm init -y
   
   npm install express cors uuid


3. Endpoints:

   GET /tasks — fetch all tasks
   
   POST /tasks — create task
   
   PUT /tasks/:id — update task
   
   DELETE /tasks/:id — delete task


5. Data:

   Tasks stored in-memory in utils/storage.js
   
   UUIDs used for task IDs
   
   Uses express.json() to handle JSON payloads





--------SETUP INSTRUCTIONS----------


1. Start Backend:-

   cd task-manager
   
   cd backend
   
   npm install
   
   node index.js


3. Start Frontend (Vite):-

   cd task-manager

   cd ../frontend
   
   npm install
   
   npm run dev


5. Command Line:- 

   Frontend runs on http://localhost:5173
   
   Backend runs on http://localhost:5000





   
