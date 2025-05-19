Task Management System

A complete-stack **Task Management System** with authentication, role-based access, and CRUD operations for tasks. Users can create, edit, delete, and filter tasks based on status and priority. Admin users can also handle other users.

Features

- JWT Authentication (Login/Register)
- Role-based access (Admin/User)
- Task CRUD with:
  - Title, Description, Due Date, Priority, Status
  - Filtering by Status & Priority
- Admin: User Management
- Tech Stack:
- Frontend: React + Vite + Tailwind CSS + React Hook Form + React Query + TypeScript
  - Backend: NestJS + PostgreSQL + TypeORM + JWT + Bcrypt

---

Local Setup Instructions

Backend (NestJS + PostgreSQL)

#### 1. Download the Zip Folder of code and extract it .

Open the app with vs code .
cd to main folder.(if not already inside it)

2. Setup PostgreSQL
"PostgreSQL must be running locally". Create a database (e.g., taskdb).

3. Configure Environment
Review the code(i have provided all the required comments in the code for better understanding) , and add the postgres values accordingly.

Open the .env file and app.module.ts and add the postgres values accordingly.(Take reference with my values[i have provided both .env file and hard coded values])
4. Install Dependencies and Run -

cd backend
npm install
npm run start:dev
✅ Backend should be running at http://localhost:3000

####**** Frontend (React + Vite)
1. Configure Environment

VITE_API_URL=http://localhost:3000
2. Install Dependencies and Run

cd task-manager-frontend
npm install
npm run dev
✅ Frontend should now be running at http://localhost:5173
 

{if you see a not found error in backend or frontend after doing everything right , just install the dependency which is mentioned in the not found error and you will be good to go}


Approach -->>
Modular Architecture: Backend employs NestJS modules for auth, user, and tasks for concern separation.

Secure Auth: Passwords get hashed using bcrypt, and JWT authentication with guarded routes.

Role-Based Access: Admins gain extra access such as user administration.

Form Handling: React Hook Form + Yup offer clean validation on the frontend.

Data Management: React Query for fetching/mutating operations with auto caching and re-fetching.

User Experience: Tailwind CSS for quick styling, status/priority filtering, and responsive UI design.

[Note - The Frontend is not that enticing and visually appealing , as my approach was, a quality backend , if required i can make the frontend much better as compared to the existing one. Please let me know if you require it .]

???? Admin Credentials 
--

To obtain the admin credentials , i have already given a Hashing Folder ,in which there is a hashing code which hashes the password , open the code of hashing and run it , now the output will be the hashed password . 

Now you have the hashed password.
Now go to postgres db and go to user table , add 1 row in it and fill the values of columns , but put the hashed password in the password column . (note - fill the role as admin in role column )
Now you have the admin credentials , use the username and password in the login form which you see after running the application successfully , but password will be admin123 .

Username - The username you entered in the column of user table
Password - admin123.

Login and you can use the app .


You can create users in user page and add task in tasks page , you can navigate through top nav bar .


