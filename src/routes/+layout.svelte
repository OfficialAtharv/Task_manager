<script>
  import "../app.css";
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';

  let sessionEmail = "";
  let theme = "light"; // IMPORTANT: declared before reactive block

  const authPages = ["/login", "/signup", "/"];

  $: currentPath = $page.url.pathname;

  // 🔥 Reactive theme application (runs every time "theme" changes)
  $: if (browser) {
    console.log("Reactive theme apply →", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }

  // 🔥 onMount initializes theme & user
  onMount(async () => {
    if (!browser) return;

    let saved = localStorage.getItem("theme");
    if (!saved) saved = "dark"; // default theme

    console.log("onMount: applying saved/default theme →", saved);
    theme = saved; // reactive block will apply it

    const { data } = await supabase.auth.getUser();
    sessionEmail = data?.user?.email || "";
    console.log("Logged in user:", sessionEmail);
  });

  // 🔥 Theme Toggle
  function toggleTheme() {
    if (!browser) return;

    console.log("Theme button clicked!");

    theme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", theme);

    console.log("Theme updated →", theme);
  }

  // Logout
  async function logout() {
    await supabase.auth.signOut();
    sessionEmail = "";
    goto("/login");
  }
</script>


{#if authPages.includes(currentPath)}
  <slot />
{:else}

<div class="flex min-h-screen bg-base-300">
  <!-- Sidebar -->
  <aside 
    class="w-64 bg-base-200 backdrop-blur-lg shadow-xl p-6 flex flex-col border-r border-base-300 sidebar-anim"
  >
    <div>
      <h2 class="text-3xl font-extrabold mb-8 tracking-tight bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text">
        Task Manager
      </h2>

      <nav class="flex flex-col gap-3">
        <a href="/tasks" class="nav-link">
          📋 Dashboard
        </a>

        <a href="/tasks/new" class="nav-link">
          ➕ Add Task
        </a>
      </nav>
    </div>

    <div class="mt-auto fade-in">
      <p class="text-xs opacity-70">Logged in as</p>
      <p class="font-semibold mb-4">{sessionEmail || "—"}</p>

      <button class="btn-logout" on:click={logout}>
        Logout
      </button>
    </div>
  </aside>

  <!-- Main -->

  <div class="flex-1 flex flex-col">
    <header class="navbar bg-base-200 shadow z-10 justify-center">
  <h3 class="text-xl font-bold">Task Dashboard</h3>
  <div class="absolute right-4">
     <button class="btn-theme" on:click={toggleTheme}>🌓 Theme</button>
  </div>
</header>

<div class="p-4 bg-base-200 text-base-content rounded-lg">
  Test Background
</div>
    <main class="p-10 bg-base-100 text-base-content min-h-screen rounded-tl-2xl shadow-inner">
      <slot />
    </main>
  </div>
</div>

{/if}

<style>
  /* Smooth fade animation */
  .animate-in {
    animation: fadeIn 0.45s ease-out;
  }
  .fade-in {
    animation: fadeIn 0.6s ease-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Sidebar slide animation */
  .sidebar-anim {
    animation: slideIn 0.4s ease;
  }
  /* Content area background (NEW) */
  .content-area {
    background-color: var(--b1);
    animation: fadeIn 0.5s ease-out;
    border-top-left-radius: 1rem;
    min-height: 100vh;
  }
  @keyframes slideIn {
    from { transform: translateX(-30px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  /* Modern Glass Sidebar Buttons */
  .nav-link {
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 500;
    background: linear-gradient(to right, #8b5cf6aa, #6366f1aa);
    color: white;
    backdrop-filter: blur(10px);
    transition: 0.25s ease;
  }

  .nav-link:hover {
    transform: translateX(6px);
    background: linear-gradient(to right, #a78bfa, #818cf8);
    box-shadow: 0 4px 14px #4c1d9580;
  }

  /* Logout Button */
  .btn-logout {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    background-color: #ef4444;
    color: white;
    font-weight: bold;
    transition: 0.25s;
  }

  .btn-logout:hover {
    background-color: #dc2626;
    transform: scale(1.05);
  }

  /* Theme Toggle Button */
  .btn-theme {
    padding: 8px 16px;
    border-radius: 10px;
    font-weight: 600;
    background: linear-gradient(to right, #6d28d9, #4f46e5);
    color: white;
    transition: 0.25s ease;
  }

  .btn-theme:hover {
    transform: scale(1.08);
    background: linear-gradient(to right, #7c3aed, #6366f1);
    box-shadow: 0 4px 14px #4f46e580;
  }
</style>
