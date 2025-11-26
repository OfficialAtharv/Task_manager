<div align="center"> <h1>📌 Task Manager — SvelteKit + Supabase</h1> <p>A clean, fast and fully authenticated Task Manager built as part of the <b>Proxie Studio Frontend Intern Assignment</b>.</p> <p> <img src="https://img.shields.io/badge/SvelteKit-Framework-orange"/> <img src="https://img.shields.io/badge/Supabase-Auth%20%26%20DB-green"/> <img src="https://img.shields.io/badge/TailwindCSS-Utility%20CSS-blue"/> <img src="https://img.shields.io/badge/DaisyUI-Components-pink"/> <img src="https://img.shields.io/badge/Status-Completed-success"/> </p> </div>
🚀 Overview

This is a Task Manager web application built using SvelteKit, Supabase, TailwindCSS, and DaisyUI.
It provides a full authentication system, allows users to create and manage tasks, and includes a beautiful light/dark theme.

The app features a clean, modern UI designed for a smooth user experience.

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

🎯 Features
🔐 Authentication (Supabase)

Email/password signup

Secure Supabase Auth

Session persistence

Route protection

Logout with session cleanup

📝 Task Management

Users can:

Create tasks

Add title, description, priority & due date

View their own tasks only

Change status (Pending/Completed)

Delete tasks

Data stored securely with Supabase Row Level Security (RLS)

🎨 UI & UX

Clean SvelteKit layout

Sidebar navigation

Modern DaisyUI components

Fully responsive on all screens

Light/Dark Theme Toggle

Smooth animations + gradients

| Layer      | Technology                   |
| ---------- | ---------------------------- |
| Frontend   | **SvelteKit**                |
| Styling    | **TailwindCSS**, **DaisyUI** |
| Auth       | **Supabase Auth**            |
| Database   | **Supabase PostgreSQL**      |
| Deployment | Vercel / Netlify-ready       |
| Build Tool | Vite                         |


📸 Screenshots
🔑 Login
<img width="1919" height="962" alt="image" src="https://github.com/user-attachments/assets/a33029b8-a2f8-40e6-a061-a49cdd124a4a" />

🧾 Signup
<img width="1919" height="914" alt="image" src="https://github.com/user-attachments/assets/98beb8e5-b9be-4482-b307-7934fa709c66" />

➕ Add Task
<img width="1919" height="912" alt="image" src="https://github.com/user-attachments/assets/538d8af6-eec1-4cab-9ed7-97bb563608ac" />
<img width="1919" height="915" alt="image" src="https://github.com/user-attachments/assets/88902098-2da9-4ea0-aec9-374d4aac8aca" />

📋 Task List
<img width="1919" height="911" alt="image" src="https://github.com/user-attachments/assets/9ca627bd-b601-4afb-ba59-3e2667a11775" />
<img width="1916" height="917" alt="image" src="https://github.com/user-attachments/assets/899e96f5-56f3-46b9-945e-b1129f14a08c" />

🛠️ Setup Instructions
git clone https://github.com/YOUR_USERNAME/sveltekit-task-manager.git
cd sveltekit-task-manager
npm install
PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

🗄️ Supabase Setup
create table tasks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  title text not null,
  description text,
  priority text,
  status text default 'Pending',
  due_date date,
  created_at timestamp default now()
);

2️⃣ Enable Row Level Security (RLS)
alter table tasks enable row level security;

3️⃣ Add Policies
create policy "User can read own tasks"
on tasks for select
using (auth.uid() = user_id);
create policy "User can insert own tasks"
on tasks for insert
with check (auth.uid() = user_id);
create policy "User can update own tasks"
on tasks for update
using (auth.uid() = user_id);
create policy "User can delete own tasks"
on tasks for delete
using (auth.uid() = user_id);

🧩 Third-Party Libraries
Library	Purpose
@supabase/supabase-js	Supabase client
tailwindcss	Utility-first CSS
daisyui	Ready-made UI components
@tailwindcss/forms	Better form styling
lucide-svelte	Icons

🧠 Design Decisions / Assumptions

Only authenticated users can access /tasks and /tasks/new

Each user manages only their own tasks

No admin panel required

Light/Dark theme preference stored in localStorage

Minimalistic UI for speed and clarity

SvelteKit load functions used for secure data fetching

🚀 Run the Project
npm run dev

Visit:
http://localhost:5173/

🙌 Acknowledgements

Proxie Studio for the Internship Assignment

SvelteKit Team

Supabase Team

DaisyUI + Tailwind community


